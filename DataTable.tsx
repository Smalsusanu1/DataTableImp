import * as React from 'react';
import styles from './TestDataTable.module.scss';
import { ITestDataTableProps } from './ITestDataTableProps';
import * as $ from 'jquery';
import 'DataTables.net';
import { ITestDataTableState } from './ITestDataTableState';
import { sp, Item } from '@pnp/sp';
import { SPComponentLoader } from '@microsoft/sp-loader';

export default class TestDataTable extends React.Component<ITestDataTableProps, {}> {

  public constructor(props: ITestDataTableProps) {
    super(props);
  }

  public componentDidMount() {
    this.getItem();
  }

  private getItem() {
    sp.web.lists.getByTitle('lsitname').items.getAll().then(values => {
      var jsonArray = values.map(function (i) {
        return [
          i.Title,
          i.num,
          i.Created
        ];
      });

      var table = $(this.refs.table).DataTable({
        data: jsonArray,
        columns: [
          { title: "Title" },
          { title: "num" },
          { title: "Created" }
        ]
      });

    });
  }

  public render(): React.ReactElement<ITestDataTableProps> {

    SPComponentLoader.loadCss("https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css");
    return (
      <div className={styles.testDataTable}>
        <div className={styles.container}>

          <div className={styles.row}>

            <table ref='table' className={styles.table}>

            </table>
          </div>
        </div>
      </div>
    );
  }