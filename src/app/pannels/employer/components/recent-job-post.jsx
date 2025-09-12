import React from 'react';

const jobPosts = [
  {
    title: 'Senior React Developer',
    applications: 34,
    posted: '2 days ago',
    status: 'active',
  },
  {
    title: 'Product Manager',
    applications: 28,
    posted: '5 days ago',
    status: 'active',
  },
  {
    title: 'UI/UX Designer',
    applications: 19,
    posted: '1 week ago',
    status: 'inactive',
  },
];

const RecentJobPosts = () => {
  return (
    <div className="col-lg-12 col-md-12 mb-4">
      <div className="panel panel-default">
        <div className="panel-heading wt-panel-heading p-a20">
          <h4 className="panel-tittle m-a0">Recent Job Posts</h4>
          <p className="text-muted">Your latest job postings</p>
        </div>
        <div className="panel-body wt-panel-body bg-white">
          {jobPosts.map((job, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
            >
              <div>
                <h5 className="mb-1">{job.title}</h5>
                <p className="mb-0 text-muted">
                  {job.applications} applications &bull; Posted {job.posted}
                </p>
              </div>
              <div>
                <span
                  className={`badge ${
                    job.status === 'active' ? 'bg-dark text-white' : 'bg-light text-muted border'
                  } p-2`}
                  style={{ textTransform: 'uppercase', fontSize: '12px' }}
                >
                  {job.status}
                </span>
                {job.status === 'active' && (
                  <span
                    className="ms-2"
                    style={{
                      fontSize: '16px',
                      color: '#999',
                      verticalAlign: 'middle',
                    }}
                  >
                    {/* &#x2715; */}
                  </span>
                )}
                {job.status === 'active' && (
                  <span
                    className="ms-2"
                    style={{
                      fontSize: '16px',
                      color: '#999',
                      verticalAlign: 'middle',
                    }}
                  >
                    {/* &#128336; */}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentJobPosts;
