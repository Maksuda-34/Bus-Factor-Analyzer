

const template=
`<div v-if="files.length > 0">
<h1>Author Relevance</h1>
<div class="bars-container" v-if="authors.length > 0">
  <div v-for="author in authors" :key="author" class="bar-container">
    <div class="bar" :style="{ width: \`\${getAuthorContributionPercentage(author)}%\` }"></div>
    <span>{{ author }} ({{ getAuthorContributionPercentage(author).toFixed(2) }}%)</span>
  </div>
</div>
<p v-else>No authors found.</p>
</div><br>`;

export default {
  props: ['authors', 'files'],
  template,
  methods: {
    getAuthorContributionPercentage(author) {
      const totalEdits = this.getTotalEdits();
      const authorEdits = this.getAuthorEdits(author);
      return totalEdits > 0 ? (authorEdits / totalEdits) * 100 : 0;
    },
    getTotalEdits() {
      return this.files.reduce((total, entry) => total + this.entryEdits(entry), 0);
    },
    entryEdits(entry) {
      return Object.values(entry.authors).reduce((sum, author) => sum + author.edits.length, 0);
    },
    getAuthorEdits(author) {
      return this.files.reduce((total, entry) => total + this.authorEdits(entry, author), 0);
    },
    authorEdits(entry, author) {
      return entry.authors[author] ? entry.authors[author].edits.length : 0;
    },
  },
};


