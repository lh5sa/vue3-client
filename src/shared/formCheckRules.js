// TODO: 重构一个 validator

// 不能为空
export const checkRequiredRules = (message) => {
  return {
    required: true,
    message,
    trigger: "blur",
  };
};

// 检查用户名
export const checkUsernameRules = [
  checkRequiredRules("用户名不能为空"),
  {
    type: "string",
    pattern: /^[_0-9a-z\u4e00-\u9fa5]{1,16}$/i,
    message: "用户名格式有误",
    trigger: "blur",
  },
];

// 检查邮箱
export const checkEmailRules = [
  checkRequiredRules("邮箱不能为空"),
  {
    type: "string",
    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: "邮箱格式有误",
    trigger: "change",
  },
];

// 检查用户密码
export const checkPasswordRules = [
  // { required: true, message: "密码不能为空", trigger: "blur" },
  checkRequiredRules("密码不能为空"),
  {
    type: "string",
    pattern: /^[a-z0-9_-]{6,16}$/i,
    message: "密码格式有误: 必须6-16位",
    trigger: "change",
  },
];

// 检查确认密码
export const getCheckConfirmRules = (validator) => {
  if (!(validator && typeof validator === "function")) {
    throw new TypeError("[getCheckConfirmRules]: 必须传入一个验证是否相等的函数");
  }
  return [
    // { required: true, message: "确认密码不能为空", trigger: "blur" },
    checkRequiredRules("确认密码不能为空"),
    {
      trigger: "blur",
      message: "两次密码不一致",
      validator,
    },
  ];
};

// 检查角色名
export const checkRoleNameRules = [
  checkRequiredRules("角色名称不能为空"),
  { pattern: /^[\u4e00-\u9fa5a-z_0-9.·-]+$/i, message: "角色名称不能包含特殊符号", trigger: "blur" },
];

// 检查角色描述
export const checkRoleDescRules = [
  checkRequiredRules("角色描述不能为空"),
  { pattern: /^[\u4e00-\u9fa5a-z_0-9.·-]+$/i, message: "角色描述不能包含特殊符号", trigger: "blur" },
];

// 检查权限路径
export const checkPerimsPathRules = [
  checkRequiredRules("权限路径不能为空"),
];
