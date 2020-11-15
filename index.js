const calculateSHA256 = require("./calculateSHA256");

class MerkelTree {
  constructor(words) {
    this.tree = [];
    this.tree[0] = words.map((word) => calculateSHA256(word));
    this.createTree();
  }

  createTree() {
    while (this.tree[0].length > 1) {
      let currentValues = [];

      for (let i = 0; i < this.tree[0].length; i += 2) {
        const isEvenIndex = i % 2 === 0;

        if (isEvenIndex && i < this.tree[0].length - 1) {
          currentValues.push(
            calculateSHA256(this.tree[0][i] + this.tree[0][i + 1])
          );
        } else {
          currentValues.push(this.tree[0][i]);
        }
      }
      this.tree.unshift(currentValues);
    }
  }

  getRoot() {
    return this.tree[0];
  }

  getHeight() {
    return this.tree.length;
  }

  getAllTree() {
    return this.tree;
  }

  getLevel(level) {
    return this.tree[level] || "level not part of tree";
  }
}

module.exports = MerkelTree;
const merkelTree = new MerkelTree(["a", "b", "c", "d", "e"]);

// console.log(merkelTree.getRoot());
// console.log(merkelTree.getHeight());
// console.log(merkelTree.getAllTree());
