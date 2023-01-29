import { ref } from "vue"; // 注: 需要使用 ref API 来实现响应式

// 类似 react-hooks 的 useState
export function useState(initValue) {
  // 创建状态(定义一个函数是方便扩展)
  function createState(initValue) {
    return ref(initValue);
  }

  // 创建设置状态的函数
  function createStateSetter(state) {
    return function (newValue) {
      if (typeof newValue === "function") {
        state.value = newValue(state.value);
      } else {
        state.value = newValue;
      }
    };
  }

  const state = createState(initValue);
  const setState = createStateSetter(state);
  return [state, setState];
}
