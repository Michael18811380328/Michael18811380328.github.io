import isArray from './utils';

/** This is a description of the foo function. */
function foo() {
}

/**
 * Represents a book.
 * @constructor
 */
function Article(title, author) {
  console.log(isArray(title));
  return title + author;
}

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
class Book {
  constructor(props) {
    this.title = props.title;
    this.author = props.author;
  }
  /**
   * say hi to someone
   * @param {string} name - The user name.
   */
  sayHi(name) {
    console.log('Hi ' + name);
  }
}

// https://github.com/photonstorm/phaser3-docs/blob/master/package.json
// https://github.com/jsdoc/jsdoc
// https://jsdoc.app/about-getting-started.html
