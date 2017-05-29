// We have to remove node_modules/react to avoid having multiple copies loaded.
// eslint-disable-next-line import/no-unresolved
import React, { PropTypes } from 'react';
import css from '@folio/stripes-components/lib/MultiColumnList/MultiColumnList.css';
import User from './User';

class ShowAllPerms extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      logger: PropTypes.object,
      connect: PropTypes.func,
    }),
    data: PropTypes.shape({
      users2: PropTypes.arrayOf(
        PropTypes.object,
      ),
    }),
  };

  static manifest = Object.freeze({
    // 'users2' to avoid colliding with module-scoped 'users' resource in ../Users.js
    users2: {
      type: 'okapi',
      records: 'users',
      path: 'users?limit=3&query=username=a* sortby personal.lastName',
    },
  });

  constructor(props) {
    super(props);
    this.connectedUser = props.stripes.connect(User);
  }

  render() {
    return (
      <div>
        <h1>User List</h1>
        <table className={css.multilist}>
          <thead>
            <tr>
              <th>Active</th>
              <th>Name</th>
              <th>Patron group</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {(this.props.data.users2 || []).map((user, index) =>
              <this.connectedUser key={index} dataKey={user.username} stripes={this.props.stripes} index={index} user={user} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ShowAllPerms;
