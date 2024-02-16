export const fetch2 = async(api,body,token="")=>{
    const res = await fetch(api,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token")
        },
        body:JSON.stringify(body)
    })
    return await res.json()
}

export const fetch3 = async(api,type,token="")=>{
    const res = await fetch(api,{
        method:type,
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("token")
        },
    })
    return await res.json()
}

// import axios from 'axios';

// export const fetch2 = async(api, body, token="") => {
//     const res = await axios.post(api, body, {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": localStorage.getItem("token")
//         }
//     });
//     return res.data;
// }
