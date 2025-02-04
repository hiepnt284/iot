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
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import sensorServices from "../../services/sensorServices";
import { Toaster, toast } from "sonner";

const Sensors = () => {
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({ pageNo: 1, pageSize: 5 });
  const [loading, setLoading] = useState(false);
  const [sortFilter, setSortFilter] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [searchType, setSearchType] = useState();
  const [operator, setoperator] = useState();
  const [searchValue1, setSearchValue1] = useState();
  const [searchValue2, setSearchValue2] = useState();
  const [searchFilter, setSearchFilter] = useState({});
  const [totalElements, setTotalElements] = useState(0);

  let pagination1 = pagination;
  let sortFilter1 = sortFilter;
  let searchFilter1 = searchFilter;

  useEffect(() => {
    const autoRefreshTimer = setInterval(() => {
      console.log("re run");
      const fetchSensorData = async () => {
        let response;
        try {
          setLoading(true);

          response = await sensorServices.getSensorData({
            params: { ...pagination1, ...sortFilter1, ...searchFilter1 },
          });
          const dataSensor = response.content.map((dataItem, index) => ({
            ...dataItem,
            key: index,
          }));
          const pageNo = response.pageNo;
          const pageSize = response.pageSize;

          setTotalElements(response.totalElements);
          setDataSource(dataSensor);
        } catch (error) {
          console.log("error", error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      };

      fetchSensorData();
    }, 5000);

    return () => {
      clearInterval(autoRefreshTimer);
    };
  }, [pagination1, sortFilter1, searchFilter1]);

  useEffect(() => {
    let ignore = false;
    const fetchSensorData = async () => {
      let response;
      try {
        setLoading(true);

        response = await sensorServices.getSensorData({
          params: { ...pagination, ...sortFilter, ...searchFilter },
        });
        const dataSensor = response.content.map((dataItem, index) => ({
          ...dataItem,
          key: index,
        }));
        if (!ignore) {
          setTotalElements(response.totalElements);
          setDataSource(dataSensor);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();

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
      key: "temperature",
      title: "Temperature (°C)",
      dataIndex: "temperature",
      sorter: true,
    },
    {
      key: "humidity",
      title: "Humidity (%)",
      dataIndex: "humidity",
      sorter: true,
    },
    {
      key: "light",
      title: "Light (Lux)",
      dataIndex: "light",
      sorter: true,
    },
    {
      key: "wind",
      title: "wind (m/s)",
      dataIndex: "wind",
      sorter: true,
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

        response = await sensorServices.getSensorData({
          params: {
            pageNo: pageNo,
            pageSize: pageSize,
            sortBy: sortBy,
            sortDir: sortDir,
            ...searchFilter,
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

  const handleSearch = () => {
    if (
      (searchType && (!operator || !searchValue1)) ||
      (operator === "in range" && !searchValue2)
    ) {
      toast.error("Invalid value");
    } else {
      setSearchFilter({
        startDate: startDate,
        endDate: endDate,
        searchBy: searchType,
        operator: operator,
        value1: searchValue1,
        value2: searchValue2,
      });
      const fetchSensorData = async () => {
        let response;
        try {
          setLoading(true);

          response = await sensorServices.getSensorData({
            params: {
              startDate: startDate,
              endDate: endDate,
              searchBy: searchType,
              operator: operator,
              value1: searchValue1,
              value2: searchValue2,
              ...pagination,
              ...sortFilter

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
      ;
    }
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
              <p className="text-white">Value:</p>

              <Space.Compact>
                <Tooltip title="Field to search" placement="bottomLeft">
                  <>
                    <Select
                      allowClear
                      placeholder="Select a field"
                      style={{
                        width: 150,
                        background: "#ffffff",
                        borderRadius: "6px",
                      }}
                      options={[
                        {
                          label: "ALL",
                          value: "ALL",
                        },
                        {
                          label: "Temperature",
                          value: "temperature",
                        },
                        {
                          label: "Humidity",
                          value: "humidity",
                        },
                        {
                          label: "Light",
                          value: "light",
                        },
                        {
                          label: "wind",
                          value: "wind",
                        },
                      ]}
                      onChange={(value) => setSearchType(value)}
                    />
                  </>
                </Tooltip>
                <Tooltip title="Select a operator" placement="bottomLeft">
                  <>
                    <Select
                      disabled={!searchType}
                      placeholder="Select a operator"
                      style={{
                        width: 150,
                        background: "#ffffff",
                      }}
                      options={[
                        {
                          label: "Equal",
                          value: "equal",
                        },
                        {
                          label: "Greater",
                          value: "greater",
                        },
                        {
                          label: "Less",
                          value: "less",
                        },
                        {
                          label: "In range",
                          value: "in range",
                        },
                      ]}
                      allowClear
                      onChange={(value) => setoperator(value)}
                    />
                  </>
                </Tooltip>
                <Tooltip
                  title={
                    operator === "in range" ? "From Value" : "Value to search"
                  }
                  placement="bottomLeft"
                >
                  <>
                    <InputNumber
                      disabled={!operator}
                      style={{
                        width: 80,
                        background: "#ffffff",
                      }}
                      placeholder={"00.00"}
                      type="number"
                      onChange={(value) => {
                        setSearchValue1(value);
                      }}
                    />
                  </>
                </Tooltip>

                {operator === "in range" && (
                  <Tooltip title={"To value"} placement="bottomLeft">
                    <>
                      <InputNumber
                        disabled={!searchValue1}
                        style={{
                          width: 80,
                          background: "#ffffff",
                        }}
                        placeholder={"00.00"}
                        type="number"
                        onChange={(value) => {
                          setSearchValue2(value);
                        }}
                      />
                    </>
                  </Tooltip>
                )}
              </Space.Compact>
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

export default Sensors;
