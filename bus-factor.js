import { isActiveContributor } from "./app.js";

const template = `<div v-if="files.length > 0">
<h1>Bus Factor Analysis</h1>
<p>
  <span class="indicator affected-files" :style="{ backgroundColor: 'red' }"></span> Affected files after hitting by bus.
  <br /><span class="indicator experienced-contributors" :style="{ backgroundColor: 'yellow' }"></span> Developer for specific files could use experience editing those files.
</p>

<div>
  <button @click="toggleHitByBusMode">Hit by Bus</button>
  <div v-if="hitByBusMode" class="hit-by-bus-authors">
    <div v-for="author in authors" :key="author" class="hit-by-bus-author" :class="{ 'selected-author': author === authorToHit }">
      <span>{{ author }}</span>
      <button @click="hitByBus(author)" @dblclick="unselectAuthor" class="cross-button">X</button>
    </div>
  </div>
</div>

<br />

<table class="table">
  <thead>
    <th style="background-color: #99ccff;">File</th>
    <th v-for="author in authors">{{ author }}</th>
  </thead>
  <tbody>
    <tr v-for="entry in files">
      <td
        :class="{ 'hit-by-bus': authorToHit && entry.authors[authorToHit] && entry.authors[authorToHit].hitByBus }"
      >
        <small>{{ pathPart(entry.file) }}</small>
        <div><b>{{ filePart(entry.file) }}<b></div>
      </td>

      <td v-for="author in authors" :class="{ low: !isActiveContributor(entry, author) }">
        <div
          :style="{ backgroundColor: entry.authors[author] && entry.authors[author].hitByBus && authorContribution(entry, author) > 50 ? 'red' : 'transparent' }"
        >
          {{ filePart(entry.file) }}
        </div>
        <div><b>{{ authorContribution(entry, author) }}%<b></div>
        <small>Edits: <b>{{ entry.authors[author] ? entry.authors[author].edits.length : 0 }}<b></small>
        <small> {{ shortDate(entry.authors[author] ? entry.authors[author].edits[0] : null) }}</small>
      </td>
    </tr>
  </tbody>
</table>
</div>`;

export default {
  props: ["files", "authors"],
  template,
  data() {
    return {
      hitByBusMode: false,
      authorToHit: '', // Store the author to be "hit by bus"
    };
  },
  computed: {
    filteredFiles() {
      if (this.authorToHit) {
        return this.files.filter((entry) => entry.authors[this.authorToHit]?.hitByBus);
      }
      return this.files;
    },
  },
  methods: {
    toggleHitByBusMode() {
      this.hitByBusMode = !this.hitByBusMode;
      this.authorToHit = null;
    },
    hitByBus(author) {
      this.authorToHit = author;
      

      this.files.forEach((entry) => {
        if (entry.authors[author]) {
          entry.authors[author].hitByBus = true;
        }
      });
      this.currentBusFactor = Math.max(0, this.currentBusFactor - 1);
    },
    unselectAuthor() {
      this.authorToHit = null;
    },
    pathPart(filename) {
      const n = filename.lastIndexOf("/");
      return n === -1 ? "" : filename.slice(0, n + 1);
    },
    filePart(filename) {
      const n = filename.lastIndexOf("/");
      return n === -1 ? filename : filename.slice(n + 1);
    },
    shortDate(date) {
      return date ? new Date(date).toLocaleDateString() : "--";
    },
    entryEdits(entry) {
      return Object.values(entry.authors).reduce((sum, author) => sum + author.edits.length, 0);
    },
    entryLastEdit(entry) {
      const val = (date) => (date ? Date.parse(date) : 0);
      return this.shortDate(
        Object.values(entry.authors)
          .map((x) => x.edits[0])
          .sort((date1, date2) => val(date2) - val(date1))[0]
      );
    },
    authorEdits(file, author) {
      return this.data.history[file].authors[author].edits.length;
    },
    authorLastEdit(file, author) {
      return this.shortDate(this.data.history[file].authors[author].edits[0]);
    },
    isActiveContributor(fileEntry, author) {
      return isActiveContributor(fileEntry.frecency, fileEntry.authors[author]);
    },
    authorContribution(fileEntry, author) {
      const contribution = (fileEntry.authors[author].frecency / fileEntry.frecency) * 100;
      return Math.round(contribution);
    },
  },
};