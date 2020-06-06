import * as React from 'react';
//import styles from './IdeaPage.module.scss';
import { IIdeaPageProps } from './IIdeaPageProps';
import {Home} from './Home';
import {History} from './History';
import {Formula} from './Formula';
//import {Nav} from './Nav';
//import { BrowserRouter as Router, Route } from 'react-router-dom';

//import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import SharePointService from '../../../services/SharePoint/SharePointService';


export default class IdeaPage extends React.Component<IIdeaPageProps, {}> {
  public render(): React.ReactElement<IIdeaPageProps> {
    return (
      <div>
      {/*
      <Router>
        <Nav ></Nav>
        <Route exact path="/sites/AtlasCorpoProject/_layouts/15/workbench.aspx/" component={Home}></Route>
        <Route path="/history" component={History}></Route>
        <Route path="/formula" component={Formula}></Route>

      </Router>

      */}

      <Pivot aria-label="Idea pivot page">
        <PivotItem
          headerText="General info"
          headerButtonProps={{
            'data-order': 1,
            'data-title': 'General info',
          }}
        >
          <Home itemId={SharePointService.itemID}></Home>
          
        </PivotItem>
        <PivotItem headerText="History">
          <History></History>
        </PivotItem>
        <PivotItem headerText="Approval">
          <Formula></Formula>
        </PivotItem>
      </Pivot>  
      

      </div>
    );
  }
}
