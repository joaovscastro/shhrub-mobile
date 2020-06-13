export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(usuario) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { usuario },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function updateSensitiveRequest(data) {
  return {
    type: '@user/UPDATE_SENSITIVE_REQUEST',
    payload: { data },
  };
}

export function updateSensitive(data) {
  return {
    type: '@user/UPDATE_SENSITIVE',
    payload: data,
  };
}
