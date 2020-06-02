import React, { useCallback, useEffect, useRef, useState } from "react";
import CaughtUp from "../../utils/CaughtUp";
import { formatDate } from "../../utils/helpers";
import ProgressChart from "../../utils/ProgressChart";
import { RecordType } from "../../utils/RecordType";
import Entry from "./components/Entry";

const Moderation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const fetchIdRef = useRef(0);

  const pageIndex = 0;
  const pageSize = 10;

  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);

    // Fetch Data
    const data = await fetch(
      `/api/v1/evidence?fields=status.state&filter=PENDING_APPROVAL`
    ).then((res) => res.json());

    if (fetchId === fetchIdRef.current) {
      setData(data.data);
      setTotalItems(data.totalItems);
      setPageCount(data.totalPages);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const refreshPage = () => {
    fetchData({ pageIndex, pageSize });
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <h2 className="title">New Submissions</h2>
          <p className="subtitle">
            Help us improve the quality of SEER resources.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns">
            {/* Progress Chart */}
            <div className="column is-3-desktop is-4-tablet">
              <ProgressChart title="Approval Queue" count={data.length} />
            </div>

            <div className="column">
              {/* Display new entries for moderation */}
              {data.map(({ id, title, __type, day, month, year, doi, url }) => (
                <Entry
                  key={id}
                  id={id}
                  title={title}
                  type={RecordType[__type]}
                  date={formatDate(day, month, year)}
                  doi={doi}
                  url={url}
                  refreshPage={refreshPage}
                />
              ))}

              {/* Display "Caught Up" if moderation queue is empty */}
              {!data.length && (
                <CaughtUp>
                  Submissions requiring your approval will be shown here.
                </CaughtUp>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Moderation;
