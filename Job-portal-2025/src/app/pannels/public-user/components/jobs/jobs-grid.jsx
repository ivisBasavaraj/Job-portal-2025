
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionJobsGrid from "../../sections/jobs/section-jobs-grid";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import { useEffect, useState } from "react";
import { loadScript } from "../../../../../globals/constants";

function JobsGridPage() {
    const [filters, setFilters] = useState({});
    
    const _filterConfig = {
        prefix: "Showing",
        type: "jobs",
        total: "150",
        showRange: false,
        showingUpto: ""
    }

    useEffect(()=>{
        loadScript("js/custom.js");
    })

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <div className="section-full p-t120  p-b90 site-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 rightSidebar">
                            <SectionJobsSidebar1 onFilterChange={handleFilterChange} />
                        </div>

                        <div className="col-lg-8 col-md-12">
                            {/*Filter Short By*/}
                            <SectionRecordsFilter _config={_filterConfig} />
                            <SectionJobsGrid filters={filters} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default JobsGridPage;