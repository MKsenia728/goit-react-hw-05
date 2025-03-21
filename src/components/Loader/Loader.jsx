import PropagateLoader from "react-spinners/PropagateLoader";
const Loader = ({ loading}) => {
  return(
    <div>
    <PropagateLoader
      loading={loading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  )
}

export default Loader;