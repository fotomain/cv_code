
export function real_shif_up_guid_sql_text() {
    return `

        SELECT

            CASE
                WHEN (v1 IS NULL) AND (v2 IS NULL) THEN 10000
                WHEN (v2 IS NULL) THEN v1-10
                ELSE  (v2+v1)/2.0
                END 

        FROM (SELECT 
                 (SELECT (SELECT MAX(order_in_list)
                          FROM content_posts
                          WHERE content_post_owner_guid = 'content_post_owner_guid_data'
                            AND order_in_list <
                                (SELECT order_in_list
                                 FROM content_posts
                                 WHERE content_post_guid = 'content_post_guid_data'
                                   AND content_post_owner_guid = 'content_post_owner_guid_data'
                                 )
                          )
                  ) AS v1,
                 (SELECT (
                             SELECT (SELECT MAX(order_in_list)
                                     FROM content_posts
                                     WHERE content_post_owner_guid = 'content_post_owner_guid_data'
                                       AND order_in_list <
                                           (SELECT MAX(order_in_list)
                                            FROM content_posts
                                            WHERE content_post_owner_guid = 'content_post_owner_guid_data'
                                              AND order_in_list <
                                                  (SELECT order_in_list
                                                   FROM content_posts
                                                   WHERE content_post_guid = 'content_post_guid_data'
                                                     AND content_post_owner_guid = 'content_post_owner_guid_data'
                                                  )
                                           )
                                    )
                             )) AS v2
            )
        
             
    `

}

export function update_shif_up_sql_text() {
    return `

                UPDATE content_posts
                SET
                    order_in_list = ( ${real_shif_up_guid_sql_text()} )
            
                WHERE
                    content_post_guid = 'content_post_guid_data' AND
                    content_post_owner_guid = 'content_post_owner_guid_data'
    
    `
}
