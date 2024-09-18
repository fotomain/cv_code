
import React from "react";
import axios from "axios";

let username='api_admin'
let application_password ='Booo RG55 skCy 3bqO DceS C31X'

class CKVApi {

    constructor(p) {

        if (!(this instanceof CKVApi)) {
            return new CKVApi();
        }


        this.url_main=p.url_main
        this.per_page = 100

        this.username=p.username
        this.application_password=p.application_password
        console.log('=== this.username ',this.username)
    }

    create = (p) => {
        axios.post(
            this.url_main,
            {
                status:  'publish',
                ...p?.data,
            }
            ,
            {
                headers: {
                    Authorization: `Basic `+ window.btoa(this.username+":"+this.application_password),
                },
                onDownloadProgress: progressEvent => {if(p.do_on_pregress)
                    p.do_on_pregress(progressEvent)
                }
            },
        ).then((res)=>{
            if(p.do_after) p.do_after(res)
            return res
        })
    }

    getNumPosts = async (p) => {
        const res = await axios(this.url_main,
            {
                params:{
                    per_page: (p.params.per_page)?p.params.per_page:this.per_page,
                    ...p.params
                },
                headers: {
                    Authorization: `Basic ` + window.btoa(username + ":" + application_password),
                },
            }
        )

        const total_pages = res.headers['x-wp-totalpages']
        const total_rows = res.headers['x-wp-total']
        const ret = {total_pages,total_rows}
        console.log("=== total_rows ",total_rows)
        console.log("=== total_pages ",total_pages)
        return ret
    }

    read_all=async (p)=> {
        console.log('=== start read_all ')

        const total_data = await this.getNumPosts(p)
        const total_pages = total_data.total_pages
        console.log('=== numPages ',total_pages)
        console.log('=== p.params ',p.params)

        const posts = []

        for (let page = 1; page <= total_pages; page += 1) {
            const read_result = axios.get(this.url_main,
                {
                    params:{
                        per_page: this.per_page,
                        page:page,

                        orderby:'title',
                        order:'asc',
                        ...p.params
                    }
                    ,
                    headers: {
                        Authorization: `Basic ` + window.btoa(username + ":" + application_password),
                    },
                    onDownloadProgress: progressEvent => {if(p.do_on_pregress)
                        p.do_on_pregress({total_data:total_data, progressEvent})
                    }

                }
            )
            posts.push(read_result)
        }

        let all_data = []
        await axios.all(posts).then((response) => {
            response.map(res =>
                all_data = [...all_data, ...res.data ]
            )
            console.log('=== all_data ',all_data)
            if(p.do_after) p.do_after(all_data)
        }).catch(e =>
            console.log('=== error all_data fetching posts: ', e)
        )

    }


    read = (p)=>{
        //=== CODEX
        //if per_page -> use per_page
        //  elxe ALL
        //if search
        //    search -> params
        // (!p?.params?.per_page)
        //     ?
        this.read_all(p).then((res)=>{

            // if(p.do_after) p.do_after(res)
            // return res
        })
        // :
        // this.read_one_request(p)

        console.log('=== OK CKVApi read ')
    }



}

const kvapi = new CKVApi({
    url_main: "http://site33.antinedoebit.com/wp-json/wp/v2/keyval",
    username:'api_admin',
    application_password:'Booo RG55 skCy 3bqO DceS C31X',
})

export {kvapi}
