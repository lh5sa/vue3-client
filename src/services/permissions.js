import { http } from "@/shared";
const perimService = Object.create(null);

// 获取权限
perimService.getPerims = (params) => http.get("/permissions", { params });

// 获取权限: 树形结构数据的
perimService.getPerimsTree = () => http.get("/permissions", { params: { type: 2 } });

// 删除
perimService.deletePerims = (data) => http.delete(`/permissions/${data.id}`, data);

// 修改
perimService.updatePerims = (data) => http.patch(`/permissions/${data.id}`, data);

// 添加
perimService.createPerims = (data) => http.post("/permissions", data);

export default perimService;
