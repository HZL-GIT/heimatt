// 关于 token 的方法

// 保存 token
function localSet (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

// 获取 token
function localGet (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

// 删除 token
function localDel (key) {
  window.localStorage.removeItem(key)
}

export { localSet, localGet, localDel }
