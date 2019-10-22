import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import lib from './isLogin'
class Announcement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: ((this.props.match || {}).params || {}).courseId,

            userType: lib.getUser().type,
            studentName: "",
            studentMail: lib.getUser().email,
            studentListArray: [{
                Title: 'New Announcement',
                Message: 'Hi All',
                Date : '03/16/2019'

            },{
                Title: 'Announcement 2',
                Message: 'Quiz scheduled on Date 04/23/2019',
                Date: '02/22/2019'


            }],
            searchCompleted: false,

        }

    }
  

    render() {
        let studentList = this.state.studentListArray.map(searchResult => {
            return (
                <tr>
                    <td><p>{searchResult.Title}</p></td>
                    <td><p>{searchResult.Message}</p></td>
                    <td><p>{searchResult.Date}</p></td>

                </tr>

            )
        })

        return (
            <div class="container" >
            <h3>Announcements</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Posted Date</th>
                </tr>
              </thead>
              <tbody>{studentList}</tbody>
            </table>
          </div>
        );
    }
}

export default Announcement;