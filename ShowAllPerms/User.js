// We have to remove node_modules/react to avoid having multiple copies loaded.
// eslint-disable-next-line import/no-unresolved
import React, { PropTypes } from 'react';

class User extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      active: PropTypes.bool.isRequired,
      patron_group: PropTypes.string, // Should be required by auth-blackbox 0.8.2 lacks this
      username: PropTypes.string.isRequired,
      personal: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    }),
    data: PropTypes.shape({
      perms: PropTypes.arrayOf(
        PropTypes.shape({
          permissionName: PropTypes.string.isRequired,
        }),
      ),
    }),
  };

  static manifest = Object.freeze({
    userId: {},
    perms: {
      type: 'okapi',
      records: 'permissionNames',
      path: 'perms/users/!{user.username}/permissions?full=true',
      uniqueKey: 'user.username',
    },
  });

  render() {
    const { user, data } = this.props;
    const perms = data ? data.perms : null;
    const personal = user.personal || {};

    return (
      <tr>
        <td>{user.active ? '✓' : ''}</td>
        <td>{personal.lastName}, {personal.firstName}</td>
        <td>{user.patron_group}</td>
        <td>{user.username}</td>
        <td>{personal.email}</td>
        <td>{(perms || []).map(p => p.permissionName).sort().join(', ')}</td>
      </tr>
    );
  }
}

export default User;
