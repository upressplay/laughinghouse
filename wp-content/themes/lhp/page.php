<?php 
	get_header(); 
	if ( have_posts() ) {
		while ( have_posts() ) {

			the_post(); 

			$output = ""; 
			$output  .=  '<div id="headerImg">'; 
			if ( has_post_thumbnail() ) {
				$output  .=  '<img src="'.  get_the_post_thumbnail_url() .'"/>'; 
			}
			$output  .=  '</div>'; 

			$output  .=  '<div class="pageBody">'; 
			$output  .=  get_the_content(); 
			$output  .=  '</div>'; 

			if( have_rows('page_gallery') ) {		 
		    	while( have_rows('page_gallery') ) {

		    		the_row(); 

		       		$section_title = get_sub_field('section_title');
		       		$section_link = get_sub_field('section_page');
		       	
					if($section_link != "") {
						$output  .=  '<a href="'.$section_link.'">'; 	
					}
		       		$output  .=  '<h2 class="pageSecTitle"> '.$section_title.' </h2>';
		       		if($section_link != "") {
		       			$output  .=  '</a>'; 
		       		}
					$output  .=  '<div class="pageRow">'; 
		       		$thumb_style = get_sub_field('thumb_style'); 
		       		$thumb_size = 'pageThumb'.$thumb_style['thumb_size'];
		       		$show_img = false;
		       		$show_title = false;
		       		$show_date = false;
		       		$show_body = false;
		       		$show_summary = false;

		       		foreach( $thumb_style['thumb_elements'] as $el ) {
		       			if($el == "img") $show_img = true;
		       			if($el == "title") $show_title = true;
		       			if($el == "date") $show_date = true;
		       			if($el == "body") $show_body = true;
		       			if($el == "summary") $show_summary = true;
		       		}

		       		$thumb_layout = $thumb_style['thumb_layout']; 
		       		
		       		$post_objects = get_sub_field('page_objects');

					foreach ( $post_objects as $post_object ) {
						foreach ( $post_object as $post) {
							setup_postdata( $post );

							$link = get_permalink($post->ID);
							$title = get_the_title($post->ID);	
							$date = get_the_date('M d, Y', $post->ID);	
							$body = get_the_content($post->ID);
							$summary = get_the_excerpt($post->ID);	
							$cat = get_the_category($post->ID);
							$cat = $cat[0]->slug;

							$vidid = get_field('youtube_vidid');
							$playlist = get_field('youtube_playlist');

							$img = get_the_post_thumbnail_url( $post->ID, $thumb_size );

							if($cat !="videos" && $cat != "gallery") {
								$output  .= '<a href="'. $link .'">';	
							}

							$output  .= '<div id="'.$post->ID.'" class="pageThumb'.$thumb_layout .' '.$cat .'" data-vidid="'.$vidid.'" data-playlist="'.$playlist.'">';
							if($show_img) {
								$output  .= '<div class="'.$thumb_size.'"><img src="'. $img .'"/></div>';	
							}
							$output  .= '<div class="pageThumbInfo">';	
							if($show_title) {
								$output  .= '<h3 class="pageThumbTitle">'. $title;	
							}
							if($show_date) {
								$output  .= '<div class="pageThumbDate">'. $date .'</div>';	
							}
							if($show_title) {
								$output  .= '</h3>';	
							}
							if($show_body) {
								$output  .= '<div class="pageThumbBody">'. $body .'</div>';	
							}
							if($show_summary) {
								$output  .= '<div class="pageThumbBody">'. $summary .'</div>';	
							}
							$output  .= '</div></div>';
							if($cat !="videos" && $cat != "gallery") {
								$output  .= '</a>';	
							}
							wp_reset_postdata();	
						}
					}
					$output  .=  '</div>'; 
				}
			}

			$cats = get_categories();

			foreach ( $cats as $cat ) {

				 $cat_name =$cat->name;

				 if( is_page($cat_name)) {
					global $post;
					$args = array( 'category_name' => $cat_name );
					$output  .=  '<a href="/'.$cat_name .'">'; 
					$output  .=  '<h2 class="pageSecTitle"> '.$cat_name.' </h2>'; 
					$output  .=  '</a>'; 
					$output  .=  '<div class="pageRow">'; 
					$category_posts = get_posts( $args );

					$posts_count = count($category_posts);
					foreach ( $category_posts as $post ) {
						setup_postdata( $post ); 
						$link = get_permalink();
						$title = get_the_title();
						$thumb_class = "pageThumbImgRect";
						$thumb_type = 'thumb';

						if(is_page('team')) {
							$thumb_type = "thumb_sq";
							$thumb_class = "pageThumbImgSq";
						}
						$img = get_the_post_thumbnail_url( $post_id, $thumb_type );
						$output  .= '<a href="'. $link .'"><div class="pageThumbVert"><div class="'.$thumb_class.'"><img src="'. $img .'"/></div><h3 class="pageThumbTitle">'. $title .'</h3></div></a>';	

					}
					$output  .=  '</div>'; 
					wp_reset_postdata();
				}
			}
		}
	}
	echo $output;
	get_footer();
?>