<<<<<<< HEAD
import { countCommits } from "./app.js";

const template = `<h2 class="bus-factor-heading">
Bus Factor Analyzer 
<button class="btn btn-sm btn-outline-secondary" @click="toggle">
        {{ shouldBeOpen ? 'Close' : 'Open'}} Upload
      </button>
</h2>

<div class="upload-box" v-if="shouldBeOpen">
<p>
  Upload the git log for your main branch, e.g., upload <code>~/gitlog.txt</code> after doing
</p>
<pre class="gitlog-command"><code>git log --no-merges --name-status main > ~/gitlog.txt</code></pre>
<div class="mb-3">
  <input class="form-control file-input" type="file" id="logFile" @change="load">
</div>
</div>
</div>`;

export default {
  props: ['empty', 'load'],
  template,
  data() {
    return {
      forceOpen: false
    }
  },
  computed: {
    shouldBeOpen() {
      return this.empty || this.forceOpen;
    },
    totalDirectories() {
      return this.files.reduce((total, entry) => total + this.countDirectories(entry.file), 0);
    },
    totalBranches() {
      return this.files.reduce((total, entry) => total + this.countBranches(entry.file), 0);
    },
  },
  methods: {
    toggle() {
      this.forceOpen = !this.forceOpen;
    }
  }
=======
import { countCommits } from "./app.js";

const template = `<h2 class="bus-factor-heading">
Bus Factor Analyzer 
<button class="btn btn-sm btn-outline-secondary" @click="toggle">
        {{ shouldBeOpen ? 'Close' : 'Open'}} Upload
      </button>
</h2>

<div class="upload-box" v-if="shouldBeOpen">
<p>
  Upload the git log for your main branch, e.g., upload <code>~/gitlog.txt</code> after doing
</p>
<pre class="gitlog-command"><code>git log --no-merges --name-status main > ~/gitlog.txt</code></pre>
<div class="mb-3">
  <input class="form-control file-input" type="file" id="logFile" @change="load">
</div>
</div>
</div>`;

export default {
  props: ['empty', 'load'],
  template,
  data() {
    return {
      forceOpen: false
    }
  },
  computed: {
    shouldBeOpen() {
      return this.empty || this.forceOpen;
    },
    totalDirectories() {
      return this.files.reduce((total, entry) => total + this.countDirectories(entry.file), 0);
    },
    totalBranches() {
      return this.files.reduce((total, entry) => total + this.countBranches(entry.file), 0);
    },
  },
  methods: {
    toggle() {
      this.forceOpen = !this.forceOpen;
    }
  }
>>>>>>> origin/main
};