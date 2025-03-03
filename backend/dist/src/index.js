'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const colors_1 = __importDefault(require('colors'))
const server_1 = __importDefault(require('./server'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const port = process.env.PORT || 5000
server_1.default.listen(port, () => {
  console.log(colors_1.default.cyan.bold(`APIのポート番号は ${port}です`))
})
//# sourceMappingURL=index.js.map
