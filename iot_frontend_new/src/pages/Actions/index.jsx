import {
  Button,
  ConfigProvider,
  DatePicker,
  InputNumber,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { SearchOutlined } from "@ant-design/icons";
import actionServices from "../../services/actionServices";

const Actions = () => {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });
  const [loading, setLoading] = useState(false);
  const [sortFilter, setSortFilter] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchType, setSearchType] = useState();
  const [searchAction, setSearchAction] = useState();
  const [searchFilter, setSearchFilter] = useState({});
  const [totalElements, setTotalElements] = useState(0);

  let pagination1 = pagination;
  let sortFilter1 = sortFilter;
  let searchFilter1 = searchFilter;

  useEffect(() => {
    const autoRefreshTimer = setInterval(() => {
      console.log("re run")
      const fetchActionData = async () => {
        let response;
        try {
          setLoading(true);

          response = await actionServices.getActionData({
            params: { ...pagination, ...sortFilter, ...searchFilter },
          });
          const actionSensor = response.content.map((dataItem, index) => ({
            ...dataItem,
            key: index,
          }));

          setTotalElements(response.totalElements);
          setDataSource(actionSensor);
        } catch (error) {
          console.log("error", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      };

      fetchActionData();
    }, 5000);

    return () => {
      clearInterval(autoRefreshTimer);
    };
  }, [pagination1, sortFilter1, searchFilter1]);


  useEffect(() => {
    let ignore = false;
    const fetchActionData = async () => {
      let response;
      try {
        setLoading(true);

        response = await actionServices.getActionData({
          params: { ...pagination, ...sortFilter, ...searchFilter },
        });
        const actionSensor = response.content.map((dataItem, index) => ({
          ...dataItem,
          key: index,
        }));
        if (!ignore) {
          setTotalElements(response.totalElements);
          setDataSource(actionSensor);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActionData();

    return () => {
      ignore = true;
    };
  }, []);

  const columns = [
    {
      key: "id",
      title: "STT",
      dataIndex: "id",
    },
    {
      key: "deviceName",
      title: "Device Name",
      dataIndex: "deviceName",
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
    },
    {
      key: "time",
      title: "Time",
      dataIndex: "time",
      sorter: true,
    },
  ];

  const handleChangPage = (pagination, filters, sorter, extra) => {
    const pageNo = pagination.current;
    const pageSize = pagination.pageSize;
    let sortBy;
    let sortDir;
    if (sorter.columnKey && sorter.order) {
      sortBy = sorter.columnKey;
      sortDir = sorter.order === "ascend" ? "ASC" : "DESC";
    }
    setPagination({
      pageNo: pageNo,
      pageSize: pageSize,
    });

    setSortFilter({
      sortBy: sortBy,
      sortDir: sortDir,
    });
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);

        response = await actionServices.getActionData({
          params: {
            pageNo: pageNo,
            pageSize: pageSize,
            sortBy: sortBy,
            sortDir: sortDir,
            ...searchFilter,
          },
        });
        const dataAction = response.content.map((dataItem, index) => ({
          ...dataItem,
          key: index,
        }));
        setTotalElements(response.totalElements);
        setDataSource(dataAction);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  };
  const handleSearch = () => {
    setSearchFilter({
      startDate: startDate,
      endDate: endDate,
      device: searchType,
      state: searchAction,
    });
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);

        response = await actionServices.getActionData({
          params: {
            startDate: startDate,
            endDate: endDate,
            device: searchType,
            state: searchAction,
            ...pagination,
            ...sortFilter,
          },
        });
        const dataSensor = response.content.map((dataItem, index) => ({
          ...dataItem,
          key: index,
        }));
        setTotalElements(response.totalElements);
        setDataSource(dataSensor);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#d8dbe2",
            headerBorderRadius: 0,
            borderColor: "gray",
          },
          Select: {},
        },
      }}
    >
      <Toaster expand={true} position="top-center" richColors />
      <div className="h-full">
        <div className="absolute left-[200px] top-[25px] text-xl font-bold">
          Sensors Data
        </div>
        <div className="px-[150px] py-[100px]">
          <div className="flex gap-3 items-center bg-gray-500 p-4 rounded-t-md">
            <Space>
              <p className="text-white">Date:</p>
              <Space>
                <DatePicker
                  showTime
                  placeholder="Start Date"
                  onChange={(date, dateString) => setStartDate(dateString)}
                />
                <DatePicker
                  showTime
                  placeholder="End Date"
                  onChange={(date, dateString) => setEndDate(dateString)}
                />
              </Space>
            </Space>

            <Space>
              <p className="text-white">Device:</p>

              <Tooltip title="Search device name" placement="bottomLeft">
                <>
                  <Select
                    placeholder="Select a device"
                    style={{
                      width: 150,
                    }}
                    defaultValue={"all"}
                    options={[
                      {
                        label: "All",
                        value: "all",
                      },
                      {
                        label: "Led",
                        value: "den",
                      },
                      {
                        label: "Fan",
                        value: "quat",
                      },
                    ]}
                    onChange={(value) => setSearchType(value)}
                  />
                </>
              </Tooltip>
              <Tooltip title="Select a action" placement="bottomLeft">
                <>
                  <Select
                    placeholder="Select a action"
                    style={{
                      width: 150,
                    }}
                    defaultValue={"all"}
                    options={[
                      {
                        label: "All",
                        value: "all",
                      },
                      {
                        label: "On",
                        value: "on",
                      },
                      {
                        label: "Off",
                        value: "off",
                      },
                    ]}
                    onChange={(value) => setSearchAction(value)}
                  />
                </>
              </Tooltip>
            </Space>

            <Tooltip title="Apply and Search">
              <Button icon={<SearchOutlined />} onClick={handleSearch}>
                Search
              </Button>
            </Tooltip>
          </div>
          <Table
            bordered
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              current: pagination.pageNo,
              pageSize: pagination.pageSize,
              total: totalElements,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              pageSizeOptions: [5, 10, 20, 50],
            }}
            onChange={handleChangPage}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Actions;
