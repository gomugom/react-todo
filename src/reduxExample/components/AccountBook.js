import React, { Component } from 'react';

class AccountBook extends Component {
    render() {
        const tableData = this.props.accountList.map(({type, money, result}, i) => (
            <tr key={i}>
                <td>{type === 'save' ? money : ''}</td>
                <td>{type === 'withdraw' ? money : ''}</td>
                <td>{result}</td>
            </tr>
        ));
        return (
            <table>
                <thead>
                    <tr>
                        <th>입금</th>
                        <th>출금</th>
                        <th>계</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        );
    }
}

export default AccountBook;
