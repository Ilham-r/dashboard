import Image from "next/image";
const ProjectCard = ({ image, title, handleDelete, handleEdit }) => {
  return (
    <div className="project-card ">
      <div className="image_wrap">
        <Image src={image} width={200} height={260} alt="project image" />
      </div>
      <h3 className="card-title">{title}</h3>

      <div className="card-hover">
        <Image
          src="/icons/supprimer.png"
          width={26}
          height={26}
          className="cursor-pointer"
          onClick={handleDelete}
        />
        <Image
          src="/icons/crayon.png"
          width={26}
          height={26}
          className="cursor-pointer"
          onClick={handleEdit}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
