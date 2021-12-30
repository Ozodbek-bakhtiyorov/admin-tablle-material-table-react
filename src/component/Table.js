import MaterialTable from "material-table";
import {useState} from "react";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import GetAppIcon from '@material-ui/icons/GetApp';
import PrintIcon from '@material-ui/icons/Print';
import {Delete} from "@material-ui/icons";
export default function Table(){
    const users = [
        {name:'Ozodbek', email:'ozodbekdeveloper@gmail.com',phone:998919249695,age:22,gender:'M',city:'Bukhara' , timeline:'2009-03-23', salary:12371.23},
        {name:'Sardorbek', email:'Sardorbekdeveloper@gmail.com',phone:998913219695,age:23,gender:'M',city:'Khorasm' , timeline:'2009-03-23', salary:1537123},
        {name:'Oybek', email:'Oybekdeveloper@gmail.com',phone:99891921935,age:null,gender:'M',city:'Tashkent' , timeline:'2009-03-23', salary:3237.123},
        {name:'Malika', email:'Malikadeveloper@gmail.com',phone:99893921935,age:20,gender:'F',city:'Tashkent' , timeline:'2009-03-23', salary:1237123},
        {name:'Baxtiyor', email:'Baxtiyodeveloper@gmail.com',phone:998919219795,age:20,gender:'M',city:'Andijan' , timeline:'2009-03-23', salary:23441.23},
    ]
    const [tableData,setTableData] = useState(users)
    const columns = [
        {title:"Name", field:"name",sorting:false, filterPlaceholder:'name'},
        {title:"Email", field:"email", sorting: false,filterPlaceholder:'example@gmail.com'},
        {title:"Phone Number", field:"phone",sorting: false, seachable:false,filterPlaceholder:'998....'},
        {title:"Age", field:"age",emptyValue:()=><em>null</em>, filterPlaceholder:'age'},
        {title:"Gender", field:"gender", lookup:{M:'Male',F:'Female'},defaultSort:'descending',filterPlaceholder:'choose gender'},
        {title:"City", field:"city",sorting: false, filterPlaceholder:'New Yourk'},
        {title:"User Timeline", field:"timeline", type:"date"},
        {title:'Salary', field:'salary', type:"currency",currencySetting:{currencyCode:"UZS",minimumFractionDigits:1},filterPlaceholder:'count'}
    ]
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
        return (
            <div>
                <MaterialTable
                    editable={{
                        onRowAdd:(newRow)=>(new Promise((resolve,reject)=>{
                            setTableData([...tableData,newRow]);
                           setTimeout(()=>resolve(),500);
                        })),
                        onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
                            const updateData = [...tableData];
                            updateData[oldRow.tableData.id] = newRow;
                            setTableData(updateData)
                            setTimeout(()=>resolve(),500)
                        }),
                        onRowDelete:(selectedData)=>new Promise((resolve,reject)=>{
                            console.log(selectedData)
                            const updatedData = [...tableData];
                            updatedData.splice(selectedData.tableData.id,1)
                            setTableData(updatedData)
                            setTimeout(()=>resolve(),500)
                        })
                    }}
                    actions={[
                        {
                            icon:()=><Delete/>,
                            tooltip:'Deleting Selected rows',
                            onClick:(e,data)=>new Promise((resolve,reject)=>{
                                    console.log(data)
                                    let updatedData = [...tableData];
                                    data.forEach(item=>{
                                        updatedData = updatedData.filter(el=>el.tableData.id !== item.tableData.id)
                                    })
                                setTableData(updatedData)
                                    setTimeout(()=>resolve(),500)
                                })
                        },
                        {
                            icon:()=><PrintIcon/>,
                            tooltip:'Print Screen',
                            onClick:()=>window.print(),
                            isFreeAction:true
                        }
                    ]}
                    // onSelectionChange={(selectedData)=>console.log(selectedData)}
                    icons={tableIcons}
                    columns={columns}
                    data={tableData}
                    options={{
                        sorting:true,
                        searchFieldAlignment:"left", searchAutoFocus:true, searchFieldVariant:"filled",
                        filtering:true,
                        pageSizeOptions:[3,5,10,20,50,100], pageSize:10,
                        paginationType:'stepped', paginationPosition:'bottom', showFirstLastPageButtons:false ,
                        exportButton:true, exportAllData:true, exportFileName:'Users Data',
                        addRowPosition:'first', actionsColumnIndex:-1,
                        selection:true,showSelectAllCheckbox:false,showTextRowsSelected:false,
                        selectionProps:(row)=>({
                            disabled:row.age===null,
                            color:'primary'
                        }),
                        grouping:false,columnsButton:true,
                        headerStyle:{background:'darkblue',color:'white'},
                    }}

                    title={"Users data"}

                />
            </div>
        );
}