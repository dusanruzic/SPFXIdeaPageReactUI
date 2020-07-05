import * as React from 'react';
import SharePointService from '../../../services/SharePoint/SharePointService';

export interface UpdateState{
    item: any;
}

export  class Update extends React.Component<{}, UpdateState> {

    constructor(props: {}){
        super(props);  

        SharePointService.getListItem(SharePointService.ideaListID, SharePointService.itemID).then(item =>{
            this.setState({
              item: item,
              //authorName: item.Author.Title
            });
            //console.log(item);

        });
    }
  public render(): React.ReactElement<{}> {
      
    return (
      <div >
        
        <h1>Page for updating idea</h1>
        
      </div>
    );
  }
}

