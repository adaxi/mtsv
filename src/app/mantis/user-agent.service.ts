import { Injectable } from '@angular/core';
import SoapLib from 'browser-soap'

const { createClient : Soap, BasicAuthSecurity } = SoapLib

const url = 'https://intranet.escaux.com/bugtracker/api/soap/mantisconnect.php?wsdl'
const username = 'mantis-connect'
const password = ''

@Injectable()
export class UserAgentService {

  private soapClient;

  constructor() {

    this.soapClient = new Promise((resolve, reject) => {
      Soap(url, (err, client) => {
        if (err) {
          return reject(err);
        }
        client.setSecurity(new BasicAuthSecurity(username, password))
        resolve(client)
      })
    })

    this.soapClient.then((client) => {
      console.log(client.describe())
      client.mc_filter_search_issues({
        username,
        password,
        filter: {
          handler_id:  '37' ,
          status_id: [ 50 ],
          custom_fields: [
            {
              item: {
                field: { name: "Sprint" },
                value: [ "200" ]
              }
            }
          ]
        },
        page_number: 0,
        per_page: 10

      }, function (err, result) {
        console.log('GBO YO', result)
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}
