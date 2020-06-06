import * as React from 'react';
import SharePointService from '../../../services/SharePoint/SharePointService';
import {IHomeState} from './IHomeState';
import {IHomeProps} from './IHomeProps';
import styles from './Home.module.scss';


export  class Home extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps){
        super(props);
    
        //bind
        this.getItem = this.getItem.bind(this);
        this.changePicture = this.changePicture.bind(this);
    
        //set initial state:
        this.state = {
          item: {Id:SharePointService.itemID, Title:''},
          images: [],
          currentImg: '',
          color: 'white',
          authorName: ''
        };
        let imgs : any[] = [];
        SharePointService.getListItem('CF70FB14-EE3E-4D16-921A-3449856770E7', SharePointService.itemID).then(item =>{
          this.setState({
            item: item,
            authorName: item.Author.Title
          })
          console.log(this.state.authorName);
          if (item.Attachments){ 
            item.AttachmentFiles.map (img => {
              imgs.push(`https://jvspdev.sharepoint.com${img.ServerRelativeUrl}`);
            });
          
            if(item.IdeaStatus == 'OPEN') {
              this.setState({
                color:'green'
              })
            }
            else if(item.ideaStatus == 'ON HOLD'){
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

          console.log(imgs);
          console.log(this.state.item);

          let a =  this.state.images[0];

          this.setState({
            currentImg : a
          })

         console.log(this.state.currentImg);
        });

        let author = this.state;
        console.log(author);
    
      }

  public render(): React.ReactElement<{}> {

    let createdOn = new Date(this.state.item.Created);
    let formatedDate = `${createdOn.toLocaleString("default", { month: "long" })} ${createdOn.getDay()}, ${createdOn.getFullYear()} at ${createdOn.getHours()}:${createdOn.getMinutes()}:${createdOn.getSeconds()}`;


    return (
      <div >
        <h1>HOMEPAGE</h1>
        <hr></hr>
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6" style={{maxHeight:'350px', marginBottom:'30px'}}>
              <img src={this.state.currentImg} style={{width:'100%', height:'100%', maxHeight:'250px'}} className={styles.thumbnail} />
            </div>

            <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-xl6">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm10 ms-md10 ms-lg10 ms-xl10" style={{maxHeight:'150px'}}>
                  <sub style={{color: '#0078d4', fontSize:'xx-small'}}>{this.state.item.IdeaStatus}</sub>
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
    SharePointService.getListItem('CF70FB14-EE3E-4D16-921A-3449856770E7', itemID)
      .then(item => {
        this.setState({
          item: item
        });
      });
  }

  public changePicture(img: string) {
    console.log('promenio!');
    this.setState({
      currentImg: img
    });

  }
}

