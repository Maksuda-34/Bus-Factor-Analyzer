<<<<<<< HEAD

import { countCommits } from "./app.js";


const template = `<div v-if="files.length > 0" class="summary-container">
<div class="summary">
  <h1>Summary</h1>
  <p>In this project <b>{{ getTotalContributors() }} developers</b> contributed actively in <b>{{ files.length }} files.</b></p>
  <p v-if="busFactor > 0">
    The project will have a hard time if <b>{{ getMostImportantContributors() }}</b> hit by a bus.
  </p>
  <p v-else>Bus Factor is 0.</p>
  <p v-if="busFactor < getTotalContributors()">In any case, the project will continue without <b>{{ getLeastContributors()}}</b>.</p>
  <p v-else>All developers are important</p><br>
  <p><h4>Key Contributors: </h4>{{ getMostImportantContributors() }}</p>
  <br>
  <p><h4>Least Contributors: </h4>{{ getLeastContributors()}}</p>
   <br>   <input v-model="threshold" type="number" min="0" placeholder="Enter threshold" />
      <button @click="updateThreshold">Update Threshold</button>
  <br>
      <p><h4>Extension Diversity Ratio:</h4></p>
  <ul v-if="getFileExtensionsPercentage().length > 0">
    <li v-for="extension in getFileExtensionsPercentage()">{{ extension }}</li>
  </ul>
  <p v-else>No files or extensions found.</p>
</div>

<br>
  <!-- Bus Factor Box -->
    <div v-if="busFactor !== null" class="bus-factor-box">
      <p><b>Bus Factor:</b></p>
      <div class="bus-factor">{{ busFactor }}
      </div>
    </div> 

  `;

export default {
  props: ['files', 'authors'],
  template,
  data() {
    return {
      threshold: 80/ this.getTotalContributors(), // Set a default threshold
      newThreshold: '', // Store the input value
      currentBusFactor: null,
    };
  },
  computed: {
    busFactor() {
      const contributorsCount = {};

      this.files.forEach((entry) => {
        Object.keys(entry.authors).forEach((author) => {
          contributorsCount[author] = (contributorsCount[author] || 0) + entry.authors[author].edits.length;
        });
      });

      const sortedContributors = Object.keys(contributorsCount).sort((a, b) => contributorsCount[b] - contributorsCount[a]);
      const mostImportantContributors = sortedContributors.filter((contributor) => contributorsCount[contributor] > this.threshold).slice(0, 10);

      this.currentBusFactor = mostImportantContributors.length;

      return this.currentBusFactor;
    },
  },
  methods: {
    getTotalContributors() {
      const contributorsSet = new Set();
      this.files.forEach(entry => {
        Object.keys(entry.authors).forEach(author => {
          contributorsSet.add(author);
        });
      });
      return contributorsSet.size;
    },
    getMostImportantContributors() {
      const contributorsCount = {};

      this.files.forEach(entry => {
        Object.keys(entry.authors).forEach(author => {
          contributorsCount[author] = (contributorsCount[author] || 0) + entry.authors[author].edits.length;
        });
      });
      const sortedContributors = Object.keys(contributorsCount).sort((a, b) => contributorsCount[b] - contributorsCount[a]);

      // Assuming you want the names of the top 3 contributors
      const mostImportantContributors = sortedContributors.filter(contributor => contributorsCount[contributor]>this.threshold).slice(0, 10);

      return mostImportantContributors.join(', ');
    },
    getLeastContributors() {
      const contributorsCount = {};
      let totalEdits = 0;
    
      this.files.forEach((entry) => {
        Object.keys(entry.authors).forEach((author) => {
          contributorsCount[author] = (contributorsCount[author] || 0) + entry.authors[author].edits.length;
          totalEdits += entry.authors[author].edits.length;
        });
      });
    
      const leastContributors = Object.entries(contributorsCount)
        .filter(([, count]) => (count / totalEdits) * 100 < this.threshold)
        .map(([author]) => author);
    
      return leastContributors.join(', ');
    },
    
    getFileExtensionsPercentage() {
        const extensionCount = {};
        const totalFiles = this.files.length;
  
        if (totalFiles === 0) {
          return [];
        }
  
        // Count occurrences of each file extension
        this.files.forEach(entry => {
          const parts = entry.file.split('.');
          if (parts.length > 1) {
            const extension = parts.pop();
            extensionCount[extension] = (extensionCount[extension] || 0) + 1;
          }
        });
  
        // Calculate percentage for each file extension
        const extensionsPercentage = Object.keys(extensionCount).map(extension => {
          const percentage = (extensionCount[extension] / totalFiles) * 100;
          return `${extension} (${percentage.toFixed(2)}%)`;
        });
  
        return extensionsPercentage;
      },
      updateThreshold() {
        // Validate if the input is a valid number
        const parsedThreshold = parseInt(this.newThreshold);
        if (!isNaN(parsedThreshold)) {
          this.threshold = parsedThreshold;
          // Call your method to recalculate bus factor with the new threshold
          this.busFactor = this.calculateBusFactor();
        } else {
          // Handle invalid input (e.g., show an error message)
          console.error('Invalid threshold. Please enter a valid number.');
        }
      },
      
  }
};
=======

import { countCommits } from "./app.js";


const template = `<div v-if="files.length > 0" class="summary-container">
<div class="summary">
  <h1>Summary</h1>
  <p>In this project <b>{{ getTotalContributors() }} developers</b> contributed actively in <b>{{ files.length }} files.</b></p>
  <p v-if="busFactor > 0">
    The project will have a hard time if <b>{{ getMostImportantContributors() }}</b> hit by a bus.
  </p>
  <p v-else>Bus Factor is 0.</p>
  <p v-if="busFactor < getTotalContributors()">In any case, the project will continue without <b>{{ getLeastContributors()}}</b>.</p>
  <p v-else>All developers are important</p><br>
  <p><h4>Key Contributors: </h4>{{ getMostImportantContributors() }}</p>
  <br>
  <p><h4>Least Contributors: </h4>{{ getLeastContributors()}}</p>
   <br>   <input v-model="threshold" type="number" min="0" placeholder="Enter threshold" />
      <button @click="updateThreshold">Update Threshold</button>
  <br>
      <p><h4>Extension Diversity Ratio:</h4></p>
  <ul v-if="getFileExtensionsPercentage().length > 0">
    <li v-for="extension in getFileExtensionsPercentage()">{{ extension }}</li>
  </ul>
  <p v-else>No files or extensions found.</p>
</div>

<br>
  <!-- Bus Factor Box -->
    <div v-if="busFactor !== null" class="bus-factor-box">
      <p><b>Bus Factor:</b></p>
      <div class="bus-factor">{{ busFactor }}
      </div>
    </div> 

  `;

export default {
  props: ['files', 'authors'],
  template,
  data() {
    return {
      threshold: 80/ this.getTotalContributors(), // Set a default threshold
      newThreshold: '', // Store the input value
      currentBusFactor: null,
    };
  },
  computed: {
    busFactor() {
      const contributorsCount = {};

      this.files.forEach((entry) => {
        Object.keys(entry.authors).forEach((author) => {
          contributorsCount[author] = (contributorsCount[author] || 0) + entry.authors[author].edits.length;
        });
      });

      const sortedContributors = Object.keys(contributorsCount).sort((a, b) => contributorsCount[b] - contributorsCount[a]);
      const mostImportantContributors = sortedContributors.filter((contributor) => contributorsCount[contributor] > this.threshold).slice(0, 10);

      this.currentBusFactor = mostImportantContributors.length;

      return this.currentBusFactor;
    },
  },
  methods: {
    getTotalContributors() {
      const contributorsSet = new Set();
      this.files.forEach(entry => {
        Object.keys(entry.authors).forEach(author => {
          contributorsSet.add(author);
        });
      });
      return contributorsSet.size;
    },
    getMostImportantContributors() {
      const contributorsCount = {};

      this.files.forEach(entry => {
        Object.keys(entry.authors).forEach(author => {
          contributorsCount[author] = (contributorsCount[author] || 0) + entry.authors[author].edits.length;
        });
      });
      const sortedContributors = Object.keys(contributorsCount).sort((a, b) => contributorsCount[b] - contributorsCount[a]);

      // Assuming you want the names of the top 3 contributors
      const mostImportantContributors = sortedContributors.filter(contributor => contributorsCount[contributor]>this.threshold).slice(0, 10);

      return mostImportantContributors.join(', ');
    },
    getLeastContributors() {
      const contributorsCount = {};
      let totalEdits = 0;
    
      this.files.forEach((entry) => {
        Object.keys(entry.authors).forEach((author) => {
          contributorsCount[author] = (contributorsCount[author] || 0) + entry.authors[author].edits.length;
          totalEdits += entry.authors[author].edits.length;
        });
      });
    
      const leastContributors = Object.entries(contributorsCount)
        .filter(([, count]) => (count / totalEdits) * 100 < this.threshold)
        .map(([author]) => author);
    
      return leastContributors.join(', ');
    },
    
    getFileExtensionsPercentage() {
        const extensionCount = {};
        const totalFiles = this.files.length;
  
        if (totalFiles === 0) {
          return [];
        }
  
        // Count occurrences of each file extension
        this.files.forEach(entry => {
          const parts = entry.file.split('.');
          if (parts.length > 1) {
            const extension = parts.pop();
            extensionCount[extension] = (extensionCount[extension] || 0) + 1;
          }
        });
  
        // Calculate percentage for each file extension
        const extensionsPercentage = Object.keys(extensionCount).map(extension => {
          const percentage = (extensionCount[extension] / totalFiles) * 100;
          return `${extension} (${percentage.toFixed(2)}%)`;
        });
  
        return extensionsPercentage;
      },
      updateThreshold() {
        // Validate if the input is a valid number
        const parsedThreshold = parseInt(this.newThreshold);
        if (!isNaN(parsedThreshold)) {
          this.threshold = parsedThreshold;
          // Call your method to recalculate bus factor with the new threshold
          this.busFactor = this.calculateBusFactor();
        } else {
          // Handle invalid input (e.g., show an error message)
          console.error('Invalid threshold. Please enter a valid number.');
        }
      },
      
  }
};
>>>>>>> origin/main
