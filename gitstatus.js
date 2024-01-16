<<<<<<< HEAD
import { countCommits } from "./app.js";
//\* <p>Zeros and ones suggest an underlying obstacle to participation. Investigate!</p> */

const template = `<div v-if="authors.length > 0">
  <h1>Git Status</h1>
  
  <table class="table">
    <thead>
      <th>Name</th>
      <th>Total Commits</th>
      <th v-for="week in weeks">{{week}}</th>
    </thead>
    <tbody>
      <tr v-for="author in authors">
        <td>{{author}}</td>
        <td>{{totalCommits(author)}}</td>
        <td v-for="week in weeks">
          {{weekCommits(author, week)}}
        </td>
      </tr>
    </tbody>
  </table>
</div>`;

export default {
  props: ['authors', 'commits', 'weeks', 'files'],
  template,
  methods: {
    weekCommits(author, week) {
      return countCommits(this.commits[author], week);
    },
    totalCommits(author) {
      return this.commits[author].length;
    }, // Add the comma here
  }
};
=======
import { countCommits } from "./app.js";
//\* <p>Zeros and ones suggest an underlying obstacle to participation. Investigate!</p> */

const template = `<div v-if="authors.length > 0">
  <h1>Git Status</h1>
  
  <table class="table">
    <thead>
      <th>Name</th>
      <th>Total Commits</th>
      <th v-for="week in weeks">{{week}}</th>
    </thead>
    <tbody>
      <tr v-for="author in authors">
        <td>{{author}}</td>
        <td>{{totalCommits(author)}}</td>
        <td v-for="week in weeks">
          {{weekCommits(author, week)}}
        </td>
      </tr>
    </tbody>
  </table>
</div>`;

export default {
  props: ['authors', 'commits', 'weeks', 'files'],
  template,
  methods: {
    weekCommits(author, week) {
      return countCommits(this.commits[author], week);
    },
    totalCommits(author) {
      return this.commits[author].length;
    }, // Add the comma here
  }
};
>>>>>>> origin/main
