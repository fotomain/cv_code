import React from "react";

import {IonReactRouter} from "@ionic/react-router";

import {createAnimation, IonRouterOutlet} from '@ionic/react';
import AppInitDataAndRoutes from "./AppInitDataAndRoutes";

import store_main from "./system_state/products_state/store/store_main";
import {Provider} from 'react-redux';


const animationBuilder = (baseEl: any, opts: any) => {
    const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl)
        .fromTo('opacity', 0, 1)
        .duration(250);

    const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl)
        .fromTo('opacity', 1, 0)
        .duration(250);

    const animation = createAnimation()
        .addAnimation(enteringAnimation)
        .addAnimation(leavingAnimation);

    return animation;
};

const AppInitRouter = (props: any) => {


    return (
        <IonReactRouter>
            <IonRouterOutlet
                id="div_main"
                animation={animationBuilder}
            >
                <Provider store={store_main}>
                    <AppInitDataAndRoutes/>
                </Provider>
            </IonRouterOutlet>
        </IonReactRouter>
    )

}

export default AppInitRouter
