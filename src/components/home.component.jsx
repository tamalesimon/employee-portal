import React from 'react';
import '../styles/main.css';
import Axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            currentPage: 1,
            employeesPerPage: 5

        };

    }

    componentDidMount() {
        this.getAllEmployees();
    }

    getAllEmployees() {
        Axios.get('/api/employees')
            .then((response) => {
                this.setState({
                    employees: response.data
                });
            }
            ).catch((err) => {
                console.error(err);
            });
    }

    changePage = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value)
        });
    }

    previousPage = () => {
        if(this.state.currentPage > 1 ) {
            this.setState({
                currentPage: this.state.currentPage -1
            });
        }
    }

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.employees.length / this.state.employeesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }

    }

    //delete Employee Data
    deleteEmployeeData = (_id) => {
        Axios.delete(`/api/employees/${_id}`).then((response) => {
            this.getAllEmployees();
        }).catch((err) => {
            console.log(err);
        });
    };

    render() {

        const { employees, currentPage, employeesPerPage } = this.state;
        const lastIndex = currentPage * employeesPerPage;
        const firstIndex = lastIndex - employeesPerPage;
        const currentEmployees = employees.slice(firstIndex, lastIndex);
        const totalPages = employees.length / employeesPerPage;

        return (
            <>

                <>
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Full Name
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    phone
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Gender
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nationality
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ip Address
                                </th>
                                <th
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                employees.length === 0 ?
                                    <tr>
                                        <td class='justify-around font-medium text-red-300 pl-1'>no employee data</td>
                                    </tr> :

                                    currentEmployees.map(({ first_name, last_name, email, phone, gender, nationality, picture,  ip_address, _id }) => (
                                        <tr>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div class="flex items-center">
                                                    <div class="flex-shrink-0 w-10 h-10">
                                                        <img class="w-full h-full rounded-full"
                                                            src={picture}
                                                            alt="" />
                                                    </div>
                                                    <div class="ml-3">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                            {first_name} {last_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{email}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {phone}
                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {gender}
                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                    {nationality}
                                                </p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden
                                                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span class="relative">{ip_address}</span>
                                                </span>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <a href="#" class="text-blue-400 hover:text-blue-600 underline">Edit</a>
                                                <a href="#" class="text-blue-400 hover:text-blue-600 underline pl-6" onClick={this.deleteEmployeeData.bind(this, _id)}>Remove</a>
                                            </td>
                                        </tr>


                                    ))
                            }
                        </tbody>
                    </table>
                </>

                <div class="px-5 py-5 bg-white border-t flex flex-row items-center justify-between">
                    <span class="text-xs xs:text-sm text-gray-900 flex">
                        Showing {currentPage} of {totalPages} Entries
                        </span>
                    <div class="flex mt-2 xs:mt-0">
                            <button 
                            onClick={this.previousPage}
                            disabled={currentPage === 1 ? true: false}
                            class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                            Prev
                            </button>
                            <button
                            onClick={this.nextPage}
                            disabled={currentPage === totalPages? true: false}
                            class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                            Next
                            </button>
                    </div>
                </div>

            </>
        );
    }
}

export default Home;