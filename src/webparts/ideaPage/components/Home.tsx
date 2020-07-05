import * as React from 'react';
import SharePointService from '../../../services/SharePoint/SharePointService';
import {IHomeState} from './IHomeState';
import {IHomeProps} from './IHomeProps';
import styles from './Home.module.scss';
import { Label } from 'office-ui-fabric-react/lib/Label';


export  class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps){
        super(props);
    
        //bind
        this.getItem = this.getItem.bind(this);
        this.changePicture = this.changePicture.bind(this);
        this.downgradeStatus = this.downgradeStatus.bind(this);
        this.upgradeStatus = this.upgradeStatus.bind(this);
        this.checkGroup = this.checkGroup.bind(this);
    
        //set initial state:
        this.state = {
          item: {Id:SharePointService.itemID, Title:''},
          images: [],
          currentImg: '',
          colorButtons: '#0078d4',
          color: 'white',
          authorName: '',
          isSoftwareDev: false

        };
        let imgs : any[] = [];
        SharePointService.getListItem(SharePointService.ideaListID, SharePointService.itemID).then(item =>{
          this.setState({
            item: item,
            authorName: item.Author.Title
          })
          
          //console.log(this.state.authorName);
          if (item.Attachments){ 
            item.AttachmentFiles.map (img => {
              imgs.push(`https://jvspdev.sharepoint.com${img.ServerRelativeUrl}`);
            });
          
            if(item.IdeaStatus == 'OPEN') {
              this.setState({
                color:'green'
              })
            }
            else if(item.IdeaStatus == 'ON HOLD'){
              this.setState({
                color: 'yellow'
              });
            }
            else {
              this.setState({
                color: 'red'
              });
            }
          }

          

          this.setState({
            images: imgs,
                      
          });

          //console.log(imgs);
          //console.log(this.state.item);

          let a =  this.state.images[0];

          this.setState({
            currentImg : a
          })

         //console.log(this.state.currentImg);
        });

        SharePointService.getGroupsOfCurrentUser().then(rs => {
          //console.log(rs);
          this.setState({
            isSoftwareDev: this.checkGroup(rs.value)});
        });

      }

  public render(): React.ReactElement<{}> {

    let createdOn = new Date(this.state.item.Created);
    let formatedDate = `${createdOn.toLocaleString("default", { month: "long" })} ${createdOn.getDay()}, ${createdOn.getFullYear()} at ${createdOn.getHours()}:${createdOn.getMinutes()}:${createdOn.getSeconds()}`;


    return (
      <div >
        <hr></hr>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6" style={{maxHeight:'350px', marginBottom:'30px'}}>
              <img src={this.state.currentImg} style={{width:'100%', height:'100%', maxHeight:'250px'}} className={styles.thumbnail} />
            </div>

            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10 ms-xl10" style={{maxHeight:'150px'}}>
                  <sub style={{color: this.state.color, fontSize:'xx-small'}}>{this.state.item.IdeaStatus}</sub>
                  <h2 style={{margin:'0px'}}>{this.state.item.Title}</h2>
                </div>
                <div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" >
                <span style={{backgroundColor: this.state.color}} className={styles.dotara}></span>
    
                </div>
              </div>
              <p>
              {this.state.item.Comment1}
              </p>
              
              <p style={{color: '#0078d4'}}>Created by {this.state.authorName} on  {formatedDate}</p>
            </div>

          </div>

          {this.state.isSoftwareDev ? 
          <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <ul className={styles.progressbar}>
                    <li onClick={this.downgradeStatus} className="ms-Grid-col ms-sm2 ms-md4 ms-lg4 ms-xl4" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
                        <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.colorButtons}} className="ms-Icon ms-lg10 ms-Icon--PageLeft" aria-hidden="true"></i>
                          <span className={styles.tooltiptext} > Downgrade Status</span>
                        </span>
                        <hr style={{backgroundColor:this.state.colorButtons}} className={styles.statusLine}></hr>
                    </li>
                    
                    <div className="ms-Grid-col ms-sm8 ms-md4 ms-lg4 ms-xl4" style={{textAlign: 'center'}}>
                      <Label>Current: {this.state.item.IdeaStatus}</Label>
                    </div>
                    <li onClick={this.upgradeStatus} className="ms-Grid-col ms-sm2 ms-md4 ms-lg4 ms-xl4" style={{maxHeight:'350px', marginBottom:'30px', padding: '0px'}}>
                        <span className={styles.tooltip}><i style={{fontSize:'x-large', textShadow: '1px 1px black', color:this.state.colorButtons}} className="ms-Icon ms-lg10 ms-Icon--PageRight" aria-hidden="true"></i>
                          <span className={styles.tooltiptext} > Upgrade Status</span>
                        </span>
                        <hr style={{backgroundColor:this.state.colorButtons}} className={styles.statusLine}></hr>
                    </li>
                  </ul>

                </div>
          </div>
              : 
              <div>
                <p>You are not able to change status of the item! Please ask software developer to change the status</p>
              </div>
              }

          
          <div className="ms-Grid-row">
            {this.state.images.length > 1?  this.state.images.map(img => {
              return(<div className="ms-Grid-col ms-sm2 ms-md2 ms-lg2 ms-xl2" onClick={() => this.changePicture(img)}><img src={img} style={{width:'100%', maxHeight:'100px'}} alt='My Home'/></div>);
            }) : ''}

          </div>

        </div>

        

      </div>
      
    );
  }


  public getItem(itemID: number): void {
    SharePointService.getListItem(SharePointService.ideaListID, itemID)
      .then(item => {
        this.setState({
          item: item
        });
        this.checkColors();
      });
  }

  public checkColors(){
    if(this.state.item.IdeaStatus == 'OPEN') {
      this.setState({
        color:'green'
      })
    }
    else if(this.state.item.IdeaStatus == 'ON HOLD'){
      this.setState({
        color:'yellow'
      });
    }
    else if(this.state.item.IdeaStatus == 'SWITCH TO SPEC (CLOSED)'){
      this.setState({
        color:'red'
      });
    }
  }

  public changePicture(img: string) {
    //console.log('promenio!');
    this.setState({
      currentImg: img
    });

  }

  public checkGroup(arrayOfGroups): boolean {
    //console.log(arrayOfGroups);
    for(let i = 0; i < arrayOfGroups.length; i++) {
      if(arrayOfGroups[i].Title == "SoftwareDeveloper") {
        //console.log('jeste soft. dev');
        return true;
      }
    }
    return false;
  }

  public downgradeStatus() {
    switch (this.state.item.IdeaStatus){
      case 'OPEN':
        //console.log('ne mozes da vratis status jer je trenutno aktuelan pocetni status');
        break;
      case 'ON HOLD':
        this.changeStatus('OPEN');
        //console.log('menjam u OPEN');
        break;
      case 'SWITCH TO SPEC (CLOSED)':
        this.changeStatus('ON HOLD');
        //console.log('menjam u ON HOLD');
        break;
      
    }

  }

  public upgradeStatus() {
    //console.log(this.state.item.ElSpecStatus);

    
    switch (this.state.item.IdeaStatus){
      case 'OPEN':
        this.changeStatus('ON HOLD');
        //console.log('menjam u under development');
        break;
      case 'ON HOLD':
        this.changeStatus('SWITCH TO SPEC (CLOSED)');
        //console.log('menjam u implementation');
        break;
      case 'SWITCH TO SPEC (CLOSED)':
        //console.log('finalni status. Nije moguce da upgradeujes status');
        break;
    }
  }

  public changeStatus(newStatus: string){
    let url = `/_api/lists/getbyid('${SharePointService.ideaListID}')/items(${SharePointService.itemID})`;
    
    SharePointService.changeStatus(url, newStatus).then(rs => {
      //console.log(rs);
      SharePointService.getListItem(SharePointService.ideaListID, SharePointService.itemID).then(item =>{
        //console.log(item);
        this.setState({
          item: item,
          //changed : true
        });
        this.checkColors();
        
      });
      
    });
  }
}

