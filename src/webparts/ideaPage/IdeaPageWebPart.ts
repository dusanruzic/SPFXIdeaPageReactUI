import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'IdeaPageWebPartStrings';
import IdeaPage from './components/IdeaPage';
import { IIdeaPageProps } from './components/IIdeaPageProps';

import SharePointService from '../../services/SharePoint/SharePointService';
import {Environment } from '@microsoft/sp-core-library';


export interface IIdeaPageWebPartProps {
  description: string;
}

export default class IdeaPageWebPart extends BaseClientSideWebPart<IIdeaPageWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IIdeaPageProps > = React.createElement(
      IdeaPage,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }
  public onInit(): Promise<void> {
    return super.onInit().then(() =>{
      //let ideaListID = 'CF70FB14-EE3E-4D16-921A-3449856770E7';
      let ideaListID = 'Idea';

      let itemID = parseInt(this.properties.description);
      //let itemID = 2; //65 je id za koji je neko drugi kreator - za test

      SharePointService.setup(this.context, Environment.type, itemID, ideaListID);

  });}

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
