export function initPerims(state, { res }) {
  const { count, rows } = res.data;
  state.count = count;
  state.perims = rows;
}

export function setCreateLayerVisible(state, { payload }) {
  state.createLayerVisible = payload;
}

export function setUpdateLayerVisible(state, { payload }) {
  state.updateLayerVisible = payload.visible;
  state.currentRow = payload.row;
}

export function setPage(state, { payload }) {
  state.params.page = payload;
}

export function setPageSize(state, { payload }) {
  state.params.size = payload;
}
