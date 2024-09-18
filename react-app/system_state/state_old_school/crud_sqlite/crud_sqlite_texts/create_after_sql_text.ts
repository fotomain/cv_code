
export function create_after_guid_sql_text() {

    return `

        SELECT

            CASE
                WHEN (v1 IS NULL) AND (v2 IS NULL) THEN 10000
                WHEN (v2 IS NULL) THEN v1+10
                ELSE  (v2+v1)/2.0
                END

        FROM (SELECT
                  (SELECT (
                          SELECT order_in_list
                          FROM content_posts
                          WHERE content_post_guid = 'content_post_guid_data'
                            AND content_post_owner_guid = 'content_post_owner_guid_data'
                          )
                  ) AS v1,
                  (SELECT (SELECT MIN(order_in_list)
                           FROM content_posts
                           WHERE content_post_owner_guid = 'content_post_owner_guid_data'
                             AND order_in_list >
                                 (SELECT order_in_list
                                  FROM content_posts
                                  WHERE content_post_guid = 'content_post_guid_data'
                                    AND content_post_owner_guid = 'content_post_owner_guid_data'
                                 )
                          )) AS v2
             )

`
}

export function create_after_sql_text() {

    return `
     INSERT INTO content_posts (
                        content_post_owner_guid,
                        content_post_title,
                        content_post_guid,
                        order_in_list
                    )
                VALUES (
                        'content_post_owner_guid_data'
                       ,'content_post_title_data'
                       ,'content_post_guid_new_data'
                   ,(
                       ${create_after_guid_sql_text()}
                    )
           )`
}
