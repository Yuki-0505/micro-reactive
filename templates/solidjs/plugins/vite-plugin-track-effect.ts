/* 使用 useEffect 收集组件更新方法 */
const fileRegex = /\.(cjs|js|ts)/
const funcRegex = /function updateComputation/
// 导入
const importUseEffect = `
import { useEffect } from "micro-reactive";
`
// 替换
const hackUpdateComputation = `
const update = updateComputation
updateComputation = function (node) {
  const self = this
  useEffect(() => update.call(self, node))
}
`

export default function TrackEffect() {
  return {
    name: 'track-effect',
    transform(src: string, id: string) {
      if (fileRegex.test(id) && funcRegex.test(src)) {
        return {
          code: importUseEffect + src + hackUpdateComputation
        }
      }
    }
  }
}
