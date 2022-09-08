import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserQuery } from "../../hooks/useUser";
import { getToken } from "../../utils/constants";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { MdWavingHand } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import { useJobQuery } from "../../hooks/useJob";
import Chip from '@mui/material/Chip';

export default function Home() {
  const [allJobs, setAllJobs] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const token = getToken();
  if (token === undefined || token === null || token === "") {
    return <Navigate to="/login" />;
  }

  const { data: jobs } = useJobQuery();
  const { data: user } = useUserQuery();

  useEffect(() => {
    setAllJobs(jobs);
  }, [jobs]);

  function handleSearch() {
    const query = searchValue;
    const newJobs = [...jobs];
    const _jobs = newJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
    );
    setAllJobs(_jobs);
  }

  function handleReset() {
    setAllJobs(jobs);
  }

  function handleSelectAll(e) {
    setAllJobs(
      jobs?.map(job => job = {...job, selected: e ? true : false})
    );
  }

  function handleSelectOne(id, e) {
    let _jobs = [...allJobs];
    let job = _jobs[id]
    job = {...job, selected: e ? true : false}
    _jobs[id] = job
    setAllJobs(
      _jobs
    );
  }

  function getSelectedNumber(){
    return allJobs?.filter(job => job?.selected === true).length;
  }

  return (
    <main className="home_container bg-[#f2f4fc] p-6 min-h-screen">
      <div className="header_container flex justify-between items-center">
        <h1 className="header text-4xl">Job Listings</h1>
        <div className="avatar flex gap-2 items-center">
          <Avatar sx={{ bgcolor: deepPurple[500] }} size="small">
            {user?.username[0].toUpperCase()}
          </Avatar>
          <span>{user?.username}</span>
        </div>
      </div>

      <div className="bg-[#673AB7] p-5 rounded-xl text-white  my-6 shadow">
        <h1 className="font-bold text-2xl ">
          Welcome, {user?.username} <MdWavingHand className="inline-block" />
        </h1>
        <p className="font-medium mt-1">
          How may we be of service to you today?
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="text-lg">All Jobs</div>
        <div className="text-small flex items-center gap-2 px-3 py-1 rounded-3xl bg-blue-200 text-blue-800">
          <BsBriefcaseFill />
          {"  "}
          <span>{allJobs?.length}</span>
        </div>
      </div>

      <div className="my-6 px-6">
        <div>
          <span
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </span>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow"
              placeholder="Search through jobs title, location or company..."
              required
            />
            <button
              onClick={() => handleSearch()}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </div>

        <Jobtable jobs={allJobs} reset={handleReset} handleSelectAll={handleSelectAll} handleSelectOne={handleSelectOne} getSelectedNumber={getSelectedNumber}/>
      </div>
    </main>
  );
}

function Jobtable({ jobs, reset, handleSelectAll, handleSelectOne, getSelectedNumber }) {
  const nums = getSelectedNumber();
  return (
    <div class="overflow-x-auto relative sm:rounded-lg my-6 shadow">
      <div className="flex justify-between">
        <button
          onClick={() => reset()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1.5 text-center mr-2 mb-2"
        >
          Reset Jobs
        </button>

        {nums > 0 && <Chip color="default" label={`${nums} Jobs selected`}/>}

      </div>

      <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-sm text-black uppercase bg-blue-200">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  onChange={(e)=>handleSelectAll(e.target.checked)}
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="py-3 px-6">
              Job Title
            </th>
            <th scope="col" class="py-3 px-6">
              Company
            </th>
            <th scope="col" class="py-3 px-6">
              Location
            </th>
            {/* <th scope="col" class="py-3 px-6">
                        Action
                    </th> */}
          </tr>
        </thead>
        <tbody>
          {jobs?.length > 0 &&
            jobs?.map((job, i) => {
              return (
                <tr class="bg-white border-b " key={i}>
                  <td class="p-4 w-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        onChange={(e)=>handleSelectOne(i,e.target.checked)}
                        checked={job?.selected}
                        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label for="checkbox-table-search-1" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {job.title}
                  </th>
                  <td class="py-4 px-6">{job.company}</td>
                  <td class="py-4 px-6">{job.location}</td>
                  {/* <td class="flex items-center py-4 px-6 space-x-3">
                        <a href="#" class="font-medium text-blue-600  hover:underline">Edit</a>
                        <a href="#" class="font-medium text-red-600  hover:underline">Remove</a>
                    </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
