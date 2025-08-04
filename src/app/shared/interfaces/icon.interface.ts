import { AnimationProp } from "@fortawesome/angular-fontawesome";
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { FlipProp, PullProp, RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export interface Icon {
    animation?: AnimationProp;
    border?   : boolean;
    classes?  : string;
    flip?     : FlipProp;
    name      : IconName;
    pull?     : PullProp;
    rotate?   : RotateProp;
    size?     : SizeProp;
    type      : IconPrefix;
}
