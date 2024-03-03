import Image from "next/image";
const ProjectCard = ({ image, title, handleDelete, handleEdit }) => {
  return (
    <div className="project-card ">
      <div className="image_wrap">
        <Image src={image} width={200} height={260} alt="project image" />
      </div>
      <h3 className="card-title">{title}</h3>

      <div className="card-hover">
        <h1 className="cursor-pointer" onClick={handleDelete}>
          delete
        </h1>
        <h1 onClick={handleEdit}>Edit</h1>
      </div>
    </div>
  );
};

export default ProjectCard;
