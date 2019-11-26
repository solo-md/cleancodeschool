const logger = require("../logger/winston.js")
const Liner = require("n-readlines")

module.exports = {
  /**
   * Calculates statistics about lines of provided csharp file.
   *
   * Csharp file contains source code, where each line can be
   * an executable code, a whitespace or a comment line.
   * Any line that is between /-* and *-/ symbols is considered
   * as a comment line. In case if comments are mixed with some
   * executable code on the same line, the line is considered as
   * executable code line.
   *
   * Statistical object (result) example:
   *   {
   *     codeLinesCount: 123,
   *     commentLinesCount: 45,
   *     whitespaceLinesCount: 6
   *   }
   *
   * @param {String} filePath A path to csharp file
   * @returns {Object} Statistics about the lines of provided csharp file
   */
  stat: (filePath) => {
    if (!filePath) {
      throw new Error("Unexpected parameter! Please provide a file path.")
    }

    const result = {
      codeLinesCount: 0,
      commentLinesCount: 0,
      whitespaceLinesCount: 0
    }

    const liner = new Liner(filePath)
    let isActiveMultilineCommentContext = false

    let nextLine
    while (nextLine = liner.next()) {
      let line = nextLine.toString().trim()
      let isMultilineCommentLine = isActiveMultilineCommentContext

      // ====== Detect whitespaces ======
      if (line === "") { // handle empty lines
        if (isMultilineCommentLine) {
          // Whitespace line in a context of multiline comment === comment line
          result.commentLinesCount++ // update comment line counter
          logger.debug(`[COMMENT]\t${nextLine}`)
        } else {
          // Once we're here, it means that the line is a whitespace
          result.whitespaceLinesCount++ // update whitespace counter
          logger.debug(`[WHITESPACE]\t${nextLine}`)
        }
        continue // jump to the next line
      }

      // ====== Detect multiline comment on the line ======
      const MULTILINE_COMMENT_ON_ONE_LINE = /\/\*[^(*/)]*\*\//g
      if (MULTILINE_COMMENT_ON_ONE_LINE.test(line)) {
        isActiveMultilineCommentContext = false // we just had "*/"
        line = line.replace(MULTILINE_COMMENT_ON_ONE_LINE, "")
        if (line.trim() === "") {
          result.commentLinesCount++
          logger.debug(`[COMMENT]\t${nextLine}`)
          continue
        }
      }

      // ====== Detect single line comment ======
      const SINGLE_LINE_COMMENT = /\/\/.*$/gm
      if (SINGLE_LINE_COMMENT.test(line)) {
        line = line.replace(SINGLE_LINE_COMMENT, "")
        if (line.trim() === "") {
          result.commentLinesCount++
          logger.debug(`[COMMENT]\t${nextLine}`)
          continue
        }
      }

      // Detect end of multiline comment that started on one of previous lines
      const END_MULTILINE_COMMENT = /\*\//g
      if (isMultilineCommentLine && END_MULTILINE_COMMENT.test(line)) {
        isMultilineCommentLine = isActiveMultilineCommentContext = false
        line = line.substring(END_MULTILINE_COMMENT.lastIndex)
        if (line.trim() === "") {
          result.commentLinesCount++
          logger.debug(`[COMMENT]\t${nextLine}`)
          continue
        }
      }

      // == Detect befin of multiline comment that ends on on of next lines ==
      const START_MULTILINE_COMMENT = /\/\*/g
      if (START_MULTILINE_COMMENT.test(line)) {
        isActiveMultilineCommentContext = true
        line = line.substring(0, START_MULTILINE_COMMENT.lastIndex - 2)
        if (line.trim() === "") {
          result.commentLinesCount++
          logger.debug(`[COMMENT]\t${nextLine}`)
          continue
        }
      }

      // ====== Detect source code ======
      if (isMultilineCommentLine) {
        // Source code line in a context of multiline comment === comment line
        result.commentLinesCount++ // update comment line counter
        logger.debug(`[COMMENT]\t${nextLine}`)
      } else {
        // Once we're here, it means that the line is a source code
        result.codeLinesCount++
        logger.debug(`[SOURCE_CODE]\t${nextLine}`)
      }
    }

    logger.debug("==========================================")
    logger.debug(`Stats: ${JSON.stringify(result)}\n`)
    return result
  }
}
