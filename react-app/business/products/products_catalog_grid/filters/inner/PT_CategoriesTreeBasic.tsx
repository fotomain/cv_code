

import React, {useEffect, useState} from "react";
import {Box, Button, Grid, IconButton} from "@mui/material";
import CWooEntity from "../../../WooProductsAdminPage/woo_api/WooEntityRoot";
import {RichTreeView} from "@mui/x-tree-view/RichTreeView";
import {TreeViewBaseItem, TreeViewItemId} from "@mui/x-tree-view/models";
import {useTreeViewApiRef} from "@mui/x-tree-view";

import ExpandIcon from '@mui/icons-material/Expand';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import {useTheme} from "@mui/material/styles";

class Metadata  {
    woo_categories = new CWooEntity('products/categories')
}
const md = new Metadata()

//tree +
// npm install @mui/x-tree-view
//tree -

//tree +
function getItemIdFunc(item:any) {
    return item.id.toString();
}


function getItemDescendantsIds(item: TreeViewBaseItem) {
    const ids: string[] = [];
    item.children?.forEach((child) => {
        ids.push(child.id);
        ids.push(...getItemDescendantsIds(child));
    });

    return ids;
}

const buildTree = (data:any, parentId = null) => {
    let tree:any = [];
    data.forEach((item:any) => {
        // Check if the item belongs to the current parent
        if (item.parent === parentId) {
            // Recursively build the children of the current item
            let children = buildTree(data, item.id);
            // If children exist, assign them to the current item
            if (children.length) {
                item.children = children;
            }
            // Add the current item to the tree
            tree.push({
                id: item.id.toString(),
                // internalId: item.id.toString(),
                // itemId: item.id.toString(),
                name: item.name, label: item.name, parent: item.parent, children: item.children });
        }
    });
    return tree;
}
//tree -


const PT_CategoriesTreeBasic = (props:any) => {

    const [state, set_state] = useState(
        {
            tree_categories:[],
            categories:[],
            show_search:false,
        }
    );

    //tree+

    const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
    const [selectedItems, setSelectedItems] = React.useState<string[]>(props?.selectedItems?(props?.selectedItems):[]);
    const toggledItemRef = React.useRef<{ [itemId: string]: boolean }>({});
    const apiRefTree = useTreeViewApiRef();

    const handleExpandedItemsChange = (
        event: React.SyntheticEvent,
        itemIds: string[],
    ) => {
        setExpandedItems(itemIds);
    };

    const handleExpandClick = () => {
        setExpandedItems((oldExpanded) =>
            oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds(state.tree_categories) : [],
        );
    };

    const handleItemSelectionToggled = (
        event: React.SyntheticEvent,
        itemId: string,
        isSelected: boolean,
    ) => {
        toggledItemRef.current[itemId] = isSelected;
    };

    const handleItemSelectedPressed = (
        event: React.SyntheticEvent,
        newSelectedItems: string[],
    ) => {
        setSelectedItems(newSelectedItems);
        console.log('=== newSelectedItems',newSelectedItems)
        // state.categories[newSelectedItems[0]]

        // Select / unselect the children of the toggled item
        const itemsToSelect: string[] = [];
        const itemsToUnSelect: { [itemId: string]: boolean } = {};
        Object.entries(toggledItemRef.current).forEach(([itemId, isSelected]) => {
            const item = apiRefTree.current!.getItem(itemId);
            if (isSelected) {
                itemsToSelect.push(...getItemDescendantsIds(item));
            } else {
                getItemDescendantsIds(item).forEach((descendantId) => {
                    itemsToUnSelect[descendantId] = true;
                });
            }
        });

        const newSelectedItemsWithChildren = Array.from(
            new Set(
                [...newSelectedItems, ...itemsToSelect].filter(
                    (itemId) => !itemsToUnSelect[itemId],
                ),
            ),
        );

        setSelectedItems(newSelectedItemsWithChildren);

        //=== DOC
        // if (itemId == null) {
        //     setSelectedItem(null);
        // } else {
        //     setSelectedItem(apiRef.current!.getItem(itemId));
        // }
        // setSelectedItem(apiRef.current!.getItem(itemId));

        toggledItemRef.current = {};
    };

    const getAllItemsWithChildrenItemIds = (items:any) => {
        const itemIds: TreeViewItemId[] = [];
        const registerItemId = (item: TreeViewBaseItem) => {
            if (item.children?.length) {
                itemIds.push(item.id);
                item.children.forEach(registerItemId);
            }
        };

        items.forEach(registerItemId);

        return itemIds;
    };

    //tree -

    const SEL_CATEGORIES_READ=()=>{

        md.woo_categories.read({
            // 'search':'Men',
            // 'slug':'men',
            // 'search':'Women',
            'per_page':100,
            'page':1,
        })
            .then((res) => {

                console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ woo_categories ',res.data)

                let work_array=res.data
                let resArray:any = []

                work_array=work_array.filter((el:any)=>
                    {
                        return (el.name!=='Men')
                            && (el.name!=='Women')
                            && (el.name!=='Uncategorized')
                            && (el.name!=='Accessories')
                    }
                )

                console.log('=== ▄▄▄▄▄▄▄▄▄▄▄▄▄ work_array woo_categories',work_array)


                const data:any = [
                    ...work_array,
                    { id: 0, parent: null, name: "Catrgaries" },
                    // { id: 2, parentId: 1, name: "Folder A" },
                    // { id: 3, parentId: 1, name: "Folder B" },
                    // { id: 4, parentId: 2, name: "File 1" },
                    // { id: 5, parentId: 2, name: "File 2" },
                    // { id: 6, parentId: 3, name: "File 3" }
                ];


                const tree = buildTree(data);
                console.log('=== tree ',JSON.stringify(tree, null, 2));
                set_state( (prev_state:any)=> {
                    return {
                        ...prev_state,
                        categories:data,
                        tree_categories:tree[0].children, //TODO no_root
                        // tree_categories:tree,
                    }
                })

                console.log('=== r3  resArray ',resArray)
                console.log('=== r3  work_array ',work_array)

            })

    }

    useEffect(() => {
            SEL_CATEGORIES_READ()
        return () => {
        };
    }, []);

    useEffect(() => {
        if(props?.initialy_expanded) {
            setExpandedItems((oldExpanded) =>
                getAllItemsWithChildrenItemIds(state.tree_categories)
            );
        }
        return () => {

        };
    }, [state.tree_categories]);


    useEffect(() => {
        if(props?.onSelectChange)
            props?.onSelectChange({selectedItems})
        return () => {
        };
    }, [selectedItems]);

    const theme = useTheme();

    // sss
    return(<>

        <Box id={'čiv_categories_tree_box'} sx={{ height: 'auto', minWidth: 240, borderBottom:('solid 1px ' + theme.palette.primary.main) }} >
            {(0===state.tree_categories.length)?
                <Grid container id={'čiv_categories_loading'}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                >
                    Loading categories...
                </Grid>
                :
                //rrr
                <Grid container id={'čiv_categories_tree'}
                      direction="column"
                      justifyContent="start"
                      alignItems="start" // left
                >
                    <Grid container id={'čiv_categories_tree_buttons'}
                        direction="row"
                        justifyContent="start"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconButton
                                onClick={()=>{

                                    setExpandedItems((oldExpanded) =>
                                        getAllItemsWithChildrenItemIds(state.tree_categories)
                                    );

                                }}

                            >
                                <ExpandIcon  sx={{}}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={()=>{
                                    setExpandedItems((oldExpanded) =>
                                        [],
                                    );
                                }}
                            >
                                <UnfoldLessIcon  sx={{}}/>
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton title={'Select all'}
                                onClick={()=>{
                                    // const do_selected = state.categories.map((el:any)=>el.id.toString())
                                    // console.log('=== do_selected',do_selected)
                                    setSelectedItems(state.categories.map((el:any)=>el.id.toString()))
                                }}
                            >
                                <CheckBoxOutlinedIcon  sx={{}}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton title={'Unselect all'}
                                onClick={()=>{
                                    setSelectedItems([])
                                }}
                            >
                                <CheckBoxOutlineBlankOutlinedIcon  sx={{}}/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton title={'Search in categories'}
                                onClick={()=>{
                                    set_state( (prev_state:any)=> {
                                        return {
                                            ...prev_state,
                                            show_search:true,
                                        }
                                    })
                                    alert('Coming soon!')
                                    // PushPinOutlinedIcon
                                }}
                            >
                                <SearchOutlinedIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton title={'Refresh categories'}
                                        onClick={()=>{
                                            SEL_CATEGORIES_READ()
                                        }}
                            >
                                <SyncOutlinedIcon/>
                            </IconButton>
                        </Grid>

                    </Grid>{/*toolbar*/}


                            <Grid item id={'div_RichTreeView_box'} sx={{minHeight:'auto'}} >
                                <RichTreeView id={'div_RichTreeView'}


                                    apiRef={apiRefTree}
                                    getItemId={getItemIdFunc} //now work for check box
                                    // expandedItems={true} //expandedItems
                                    items={state.tree_categories as TreeViewBaseItem[]}

                                    multiSelect
                                    checkboxSelection

                                    selectedItems={selectedItems}
                                    onItemSelectionToggle={handleItemSelectionToggled}
                                    onSelectedItemsChange={handleItemSelectedPressed}

                                    expandedItems={expandedItems}
                                    onExpandedItemsChange={handleExpandedItemsChange}

                                />
                             </Grid>

                </Grid>
            }
        </Box>
    </>)

}

{/*<Button onClick={handleExpandClick}>*/}
{/*    {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}*/}
{/*</Button>*/}

export default PT_CategoriesTreeBasic

