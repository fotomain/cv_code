// https://www.npmjs.com/package/@types/react-window-infinite-loader


import { Component, FC, ReactNode, Ref } from "react";

// ===================
// =================== InfiniteLoaderProps
// ===================


import { FixedSizeList, ListOnItemsRenderedProps, VariableSizeList } from "react-window";


type OnItemsRendered = (props: ListOnItemsRenderedProps) => any;

interface InfiniteLoaderProps {
    isItemLoaded: (index: number) => boolean;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void> | void;
    itemCount: number;
    children: (props: { onItemsRendered: OnItemsRendered; ref: (ref: any) => void }) => ReactNode;
    threshold?: number | undefined;
    minimumBatchSize?: number | undefined;
}

declare class InfiniteLoader extends Component<InfiniteLoaderProps> {
    resetloadMoreItemsCache(autoReload?: boolean): void;
}

export = InfiniteLoader;

// ===================
// =================== AutoSizerProps
// ===================
//
// export interface Size {
//     height: number;
//     width: number;
// }
//
// export interface AutoSizerProps {
//     /** Function responsible for rendering children. */
//     children: (size: Size) => React.ReactNode;
//
//     /** Optional custom CSS class name to attach to root AutoSizer element.    */
//     className?: string | undefined;
//
//     /** Default height to use for initial render; useful for SSR */
//     defaultHeight?: number | undefined;
//
//     /** Default width to use for initial render; useful for SSR */
//     defaultWidth?: number | undefined;
//
//     /** Disable dynamic :height property */
//     disableHeight?: boolean | undefined;
//
//     /** Disable dynamic :width property */
//     disableWidth?: boolean | undefined;
//
//     /** Nonce of the inlined stylesheet for Content Security Policy */
//     nonce?: string | undefined;
//
//     /** Callback to be invoked on-resize */
//     onResize?: ((size: Size) => void) | undefined;
//
//     /** Optional inline style */
//     style?: React.CSSProperties | undefined;
// }
//
// export = AutoSizerProps