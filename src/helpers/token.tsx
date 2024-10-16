export const config = {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    }
}

export const setConfig = () => config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`