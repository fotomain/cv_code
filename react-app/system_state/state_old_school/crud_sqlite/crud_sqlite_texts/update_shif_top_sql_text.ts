
export function update_shif_top_sql_text() {
    return `

                UPDATE content_posts
                SET
                    order_in_list = ( SELECT MIN(order_in_list)-10
                                      FROM content_posts
                                      WHERE content_post_owner_guid = 'content_post_owner_guid_data'
                                      )
            
                WHERE
                    content_post_guid = 'content_post_guid_data' AND
                    content_post_owner_guid = 'content_post_owner_guid_data'
    
    `
}
