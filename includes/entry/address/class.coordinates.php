<?php

/**
 * Class cnCoordinates
 *
 * @since 8.6
 */
final class cnCoordinates {

	/**
	 * @since 8.6
	 * @var float
	 */
	private $latitude;

	/**
	 * @since 8.6
	 * @var float
	 */
	private $longitude;

	/**
	 * @access public
	 * @since  8.6
	 *
	 * @param float $latitude
	 * @param float $longitude
	 */
	public function __construct( $latitude, $longitude ) {

		$this->setLatitude( $latitude );
		$this->setLongitude( $longitude );
	}

	/**
	 * Returns the latitude.
	 *
	 * @access public
	 * @since  8.6
	 *
	 * @return float
	 */
	public function getLatitude() {

		return $this->latitude;
	}

	/**
	 * @access public
	 * @since  8.6
	 *
	 * @param float $latitude
	 */
	public function setLatitude( $latitude ) {

		$this->latitude = number_format( (float) $latitude, 12 );
	}

	/**
	 * Returns the longitude.
	 *
	 * @access public
	 * @since  8.6
	 *
	 * @return float
	 */
	public function getLongitude() {

		return $this->longitude;
	}

	/**
	 * @access public
	 * @since  8.6
	 *
	 * @param $longitude
	 */
	public function setLongitude( $longitude ) {

		$this->longitude = number_format( (float) $longitude, 12 );
	}
}