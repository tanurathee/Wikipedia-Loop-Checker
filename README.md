# Wikipedia Loop Checker


## Installation

1. Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. Clone this repository to your local machine using `git clone`.
3. Navigate to the project directory in your terminal.
4. Install the required dependencies by running `npm install`.

## Usage

1. Start the application by running `node app.js`.
2. Use the following API endpoints:

`GET /find-philosophy?url=URL_OF_WIKIPEDIA_PAGE`: Calculate the number of requests required to reach the "Philosophy" page from a provided Wikipedia URL.

      Example:
      curl http://localhost:3000/find-philosophy?url=https://en.wikipedia.org/wiki/Tree

      Response:
      {
        "count": 5,
        "visitedPages": [
          "https://en.wikipedia.org/wiki/Tree",
          "https://en.wikipedia.org/wiki/Plant",
          "https://en.wikipedia.org/wiki/Living_organism",
          "https://en.wikipedia.org/wiki/Organism",
          "https://en.wikipedia.org/wiki/Philosophy"
        ]
      }

## Dependencies

- Express.js
- Axios
- Cheerio

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
