import { Injectable } from '@angular/core';
import { promisify } from 'es6-promisify';
import BrowserSOAP from 'browser-soap';
import SemverCompare from 'semver-compare';

import { Story } from './story';
import { Release } from './release';
import { Project } from './project';

const { createClient, BasicAuthSecurity } = BrowserSOAP

const url = 'https://intranet.escaux.com/bugtracker/api/soap/mantisconnect.php?wsdl'
const username = 'mantis-connect'
const password = ''


@Injectable()
export class MantisService {

  private soapClient;

  constructor() {
    this.soapClient = new Promise((resolve, reject) => {
      createClient(url, (err, client) => {
        if (err) { return reject(err); }
        client.setSecurity(new BasicAuthSecurity(username, password))
        resolve(client);
      })
    })
  }

  getStory(issue_id: number): Promise<Story> {
    return this.soapClient.then((client) => {
      return new Promise((resolve, reject) => {
        const args = {username, password, issue_id}
        client.mc_issue_get(args, (err, result) => {
          return Story.fromSoap(result.return.item, this)
        })
      });
    })
  }

  getStories(issue_ids: number[]): Promise<Story> {
    return this.soapClient.then((client) => {
      return new Promise((resolve, reject) => {
        const args = {username, password, issue_ids: issue_ids.map((i) => { return {  item : i } } )}
        client.mc_issues_get(args, (err, result) => {
          return result.return.item.map((item) => Story.fromSoap(item, this))
        })
      });
    })
  }

  getProjectStories(projectId: number): Promise<Story[]> {
    return this.soapClient.then((client) => {
      return new Promise((resolve, reject) => {
        client.mc_project_get_issues({
          username, password,
          project_id: projectId,
          page_number: 0,
          per_page: 1000
        }, (err, result) => {
          resolve(result.return.item.map((item) => Story.fromSoap(item, this)))
        })
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  getStoriesByRelease(projectId: number, release) : Promise<Story[]> {
    return this.soapClient.then((client) => {
      return new Promise((resolve, reject) => {
        client.mc_filter_search_issues({
          username, password,
          filter: {
            project_id:  [
              { item: projectId }
            ],
            product_version: [
              { item : release },
            ]
          },
          page_number: 0,
          per_page: 100

        }, (err, result) => {
          resolve(
            result && result.return && result.return.item
              ? result.return.item.map((item) => Story.fromSoap(item, this))
              : []
          )
        })
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  getReleases(projectId: number): Promise<Release[]> {
    return this.soapClient.then((client) => {
      return new Promise((resolve, reject) => {
        client.mc_project_get_versions({
          username, password,
          project_id: projectId,
        }, (err, result) => {
          resolve(result.return.item
            .map((item) => Release.fromSoap(item, this))
            .sort((a, b) => SemverCompare(a.summary, b.summary) * -1)
          )
        })
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  getProjects(): Promise<Project[]> {
    return Promise.all([
      (new Project(4000040, 'UEP', this)).init()
    ])
  }

  searchStory(projectId): Promise<Story[]> {
    return this.soapClient.then((client) => {
      return new Promise((resolve, reject) => {
        client.mc_filter_search_issues({
          username, password,
          // filter: {
          //   handler_id:  '37' ,
          //   status_id: [ 50 ],
          //   custom_fields: [
          //     {
          //       item: {
          //         field: { name: "Sprint" },
          //         value: [ "200" ]
          //       }
          //     }
          //   ]
          // },
          // page_number: 0,
          // per_page: 10

        }, (err, result) => {
          resolve(result.return.item.map((item) => Story.fromSoap(item, this)))
        })
      })
    }).catch((err) => {
      console.error(err)
    })
  }

}
