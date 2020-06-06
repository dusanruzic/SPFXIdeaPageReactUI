import { IListItem } from './../../../services/SharePoint/IListItem';

export interface IHomeState {
    item: IListItem;
    images: any[];
    currentImg: string;
    color: string;
    authorName: string;
}