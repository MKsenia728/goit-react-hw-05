import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
    <p>
        404 Not Found! Please follow this{' '}
        <Link to="/">link</Link>
    </p>
</div>
  )
}

export default NotFoundPage;